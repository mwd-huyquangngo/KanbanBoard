import constants from '../constants/constants';
import KanbanAPI from '../api/KanbanAPI';

let TaskActionCreators = {

    addTask(cardId, task) {
        return (dispatch) => {
            dispatch({type: constants.CREATE_TASK, cardId: cardId, task: task});
            KanbanAPI.addTask(cardId, task).then(
                (response) => dispatch({type: constants.CREATE_TASK_SUCCESS, cardId: cardId, oldTaskId: task.id, newTask: response}),
                (error) => dispatch({type: constants.CREATE_TASK_ERROR, cardId: cardId, taskId: task.id})
            );
        }
    },

    deleteTask(cardId, task) {
        return (dispatch) => {
            dispatch({type: constants.DELETE_TASK, cardId: cardId, taskId: task.id});
            KanbanAPI.deleteTask(cardId, task.id).then(
                (response) => dispatch({type: constants.DELETE_TASK_SUCCESS}),
                (error) => dispatch({type: constants.DELETE_TASK_ERROR, cardId: cardId, task: task})
            );
        }
    },

    toggleTask(cardId, task) {
        return (dispatch) => {
            dispatch({type: constants.TOGGLE_TASK, cardId: cardId, taskId: task.id});
            KanbanAPI.toggleTask(cardId, task).then(
                (response) => dispatch({type: constants.TOGGLE_TASK_SUCCESS}),
                (error) => dispatch({type: constants.TOGGLE_TASK_ERROR, cardId: cardId, taskId: task.id})
            );
        }
    }

};

export default TaskActionCreators;
