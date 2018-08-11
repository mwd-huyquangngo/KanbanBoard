import React, {Component} from 'react';
import KanbanBoard from '../components/KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';
import { throttle } from '../utils/utils';

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
        //only call updateCardsStatus when arguments change
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));

        //call updateCardsPosition at max every 500ms (or when argument change)
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500);
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

    //listId is status of list: todo, in-progress, done
    updateCardStatus(cardId, listId) {
        //find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        //get the current card
        let card = this.state.cards[cardIndex];

        if (card) {
            //only process if hovering over a different list
            if (card.status !== listId) {
                //set the component state to the mutated object
                this.setState(update(this.state, {
                    cards: {
                        [cardIndex]: {
                            status: {$set: listId},
                            color: {$set: this.getCardColor(listId)}
                        }
                    }
                }));
            }
        }
    }

    getCardColor(listId) {
        let color;

        switch (listId) {
            case 'todo':
                color = '#3A7E28';
                break;
            case 'in-progress':
                color = '#BD8D31';
                break;
            case 'done':
                color = '#EE102D';
                break;
        }

        return color;
    }

    updateCardPosition(cardId, afterId) {
        //only process if hovering over a different card
        if (cardId !== afterId) {
            //find the index of the card
            let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

            //get the current card
            let card = this.state.cards[cardIndex];

            //find the index of card that user is hovering over
            let afterIndex = this.state.cards.findIndex((card) => card.id==afterId);

            //use splice to remove card and reinsert it in a new index
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
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
                    cardCallbacks={
                        {
                            updateStatus: this.updateCardStatus,
                            updatePosition: this.updateCardPosition
                        }
                    }        
            />
        );
    }
}

export default KanbanBoardContainer;
