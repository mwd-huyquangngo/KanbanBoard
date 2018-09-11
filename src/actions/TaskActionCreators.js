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
    }

};

export default TaskActionCreators;
