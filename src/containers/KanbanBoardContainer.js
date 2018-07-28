import React, {Component} from 'react';
import KanbanBoard from '../components/KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';

const API_URL = 'http://kanbanapi.pro-react.com';

const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'huy.quang.ngo',
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: [],
        };
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
                window.state = this.state;
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    addTask(cardId, taskName) {
        // Keep a reference to the original state prior to the mutations
        // in case you need to revert the optimistic changes in the UI
        let prevState = this.state;

        //find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        //create a new task with taskName and temporatory ID
        let newTask = {
            id: Date.now(),
            name: taskName,
            done: false
        };

        //create a new object and push the new task into the array of tasks
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    $push: [newTask]
                }
            }
        });

        //set the component state to the mutated object
        this.setState({cards:nextState});

        //call API to add task to server
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        //after adding new task to server by temporary ID
        //we need to get the real ID on server to sync with taskID in state of React object
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    //throw an error if server response failed
                    //we can revert back the optimistic changes made to the UI
                    throw new Error("Server response FAILED for ADDDING task.");
                }
            })
            .then((responseData) => {
                //when the server returns the definitive ID
                //used for the new task on the server, update it on React
                newTask.id = responseData.id;
                this.setState({cards:nextState});
            })
            .catch((error) => {
                console.error("ADD task error:",error);
                this.setState(prevState);
            });
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
            <KanbanBoard cards={this.state.cards} 
                    taskCallbacks={
                        {
                            toggle: this.toggleTask.bind(this),
                            delete: this.deleteTask.bind(this),
                            add: this.addTask.bind(this)
                        }
                    }        
            />
        );
    }
}

export default KanbanBoardContainer;