import React, {Component} from 'react';
import KanbanBoard from '../components/KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';
import { throttle } from '../utils/utils';
import { Route, withRouter } from "react-router-dom";
import CardActionCreators from '../actions/CardActionCreators';
import TaskActionCreators from '../actions/TaskActionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const API_URL = 'http://kanbanapi.pro-react.com';

const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'huy.quang.ngo',
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {
        this.props.cardActions.fetchCards();
    }

    deleteTask(cardId, taskId, taskIndex) {
        // Keep a reference to the original state prior to the mutations
        // in case you need to revert the optimistic changes in the UI
        let prevState = this.state;

        //find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        //create a new object without the task
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex,1]]}
            }
        });

        //set the component state to the mutated object
        this.setState({cards:nextState});

        //call the API to remove the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
        .then((response) => {
            if(!response.ok) {
                //throw an error if server response failed
                //we can revert back the optimistic changes made to the UI
                throw new Error("Server response FAILED for DELETING task.");
            }
        })
        .catch((error) => {
            console.error("DELETE task error:",error);
            this.setState(prevState);
        });
    }

    toggleTask(cardId, taskId, taskIndex) {
        // Keep a reference to the original state prior to the mutations
        // in case you need to revert the optimistic changes in the UI
        let prevState = this.state;

        //find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        //update the 'done' value of task
        let newDoneValue;

        //using the $apply command, you will change the done value to its opposite
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex] : {
                        done: {$apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });

        //set the component state to the mutated object
        this.setState({cards:nextState});

        //call API to toggle the task on the server
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        })
        .then((response) => {
            if(!response.ok) {
                //throw an error if server response failed
                //we can revert back the optimistic changes made to the UI
                throw new Error("Server response FAILED for TOGGLING task.");
            }
        })
        .catch((error) => {
            console.error("TOGGLE task error:",error);
            this.setState(prevState);
        });
    }

    render() {
        return(   
            <Route render={() => ( 
                <KanbanBoard {...this.props} />
            )} />
        );
    }
}

const mapStateToProps = (state) => ({
    cards: state.cards,
});

const mapDispatchToProps = (dispatch) => ({
    cardActions: bindActionCreators(CardActionCreators, dispatch),
    taskActions: bindActionCreators(TaskActionCreators, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KanbanBoardContainer));
