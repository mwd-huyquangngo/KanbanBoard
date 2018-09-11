import constants from '../constants/constants';
import update from 'react-addons-update';

const cards = (state = [], action) => {
    let cardIndex;
    let taskIndex;

    switch (action.type) {
        case constants.FETCH_CARDS_SUCCESS:
            return action.cards;
        case constants.CREATE_CARD:
            return update(state, {$push: [action.card]});
        case constants.CREATE_CARD_SUCCESS:
            cardIndex = getCardIndex(state, action.oldCard.id);
            return update(state, {
                [cardIndex] : {
                    id: {$set: action.createdCard.id}
                }
            });
        case constants.CREATE_CARD_ERROR:
            cardIndex = getCardIndex(state, action.card.id);
            return update(state, {$splice: [[cardIndex, 1]]});
        case constants.UPDATE_CARD_SUCCESS:
            cardIndex = getCardIndex(state, action.updatedCard.id);
            return update(state, {
                [cardIndex] : {
                    $set: action.updatedCard
                }
            });
        // case constants.UPDATE_CARD_ERROR:
        //     cardIndex = getCardIndex(state, action.oldCard.id);
        //     return update(state, {
        //         [cardIndex] : {
        //             $set: action.oldCard
        //         }
        //     });
        case constants.UPDATE_CARD_STATUS:
            cardIndex = getCardIndex(state, action.payload.cardId);
            return update(state, {
                [cardIndex]: {
                    status: {$set: action.payload.listId},
                    color: {$set: getCardColor(action.payload.listId)}
                }
            });
        case constants.UPDATE_CARD_POSITION:
            if(action.payload.cardId !== action.payload.afterId) {
                cardIndex = getCardIndex(state, action.payload.cardId);
                let card = state[cardIndex];
                let afterIndex = getCardIndex(state, action.payload.afterId);
                return update(state, {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                });
            }
            return state;
        case constants.PERSIST_CARD_DRAG_ERROR:
            cardIndex = getCardIndex(state, action.card.id);
            return update(state, {
                [cardIndex]: {
                    status: {$set: action.card.status},
                    color: {$set: action.card.color}
                }
            });
        case constants.CREATE_TASK:
            cardIndex = getCardIndex(state, action.cardId);
            return update(state, {
                [cardIndex]: {
                    tasks: {
                        $push: [action.task]
                    }
                }    
            });
        case constants.CREATE_TASK_SUCCESS:
            cardIndex = getCardIndex(state, action.cardId);
            taskIndex = getTaskIndex(state, cardIndex, action.oldTaskId);
            return update(state, {
                [cardIndex] : {
                    tasks: {
                        [taskIndex] : {
                            id: {$set: action.newTask.id}
                        }
                    }
                }
            });
        case constants.CREATE_CARD_ERROR:
            cardIndex = getCardIndex(state, action.cardId);
            taskIndex = getTaskIndex(state, cardIndex, action.taskId);
            return update(state, {
                [cardIndex] : {
                    tasks : {
                        $splice: [[taskIndex, 1]]
                    }
                }
            });
        case constants.DELETE_TASK:
            cardIndex = getCardIndex(state, action.cardId);
            taskIndex = getTaskIndex(state, cardIndex, action.taskId);
            return update(state, {
                [cardIndex] : {
                    tasks : {
                        $splice: [[taskIndex, 1]]
                    }
                }
            });
        case constants.DELETE_TASK_ERROR:
            cardIndex = getCardIndex(state, action.cardId);
            taskIndex = getTaskIndex(state, cardIndex, action.task.id);

            return update(state, {
                [cardIndex] : {
                    tasks: {
                        [taskIndex] : {
                            $splice: [[taskIndex, 0, action.task]]
                        }
                    }
                }
            });
        case constants.TOGGLE_TASK:
            cardIndex = getCardIndex(state, action.cardId);
            taskIndex = getTaskIndex(state, cardIndex, action.taskId);
            return update(state, {
                [cardIndex]: {
                    tasks: {
                        [taskIndex] : {
                            done: { $apply: (done) => !done }
                        }
                    }
                }
            });
        case constants.TOGGLE_TASK_ERROR:
            cardIndex = getCardIndex(state, action.cardId);
            taskIndex = getTaskIndex(state, cardIndex, action.taskId);
            return update(state, {
                [cardIndex]: {
                    tasks: {
                        [taskIndex] : {
                            done: { $apply: (done) => !done }
                        }
                    }
                }
            });
        default:
            return state;
    }
};

function getCard(state, id) {
    return state.find((card) => card.id === id);
}

function getCardIndex(state, id) {
    return state.findIndex((card) => card.id === id);
}

function getTaskIndex(state, cardIndex, taskId) {
    return state[cardIndex].tasks.findIndex((task) => task.id === taskId);
}

function getCardColor(listId) {
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

export default cards;
