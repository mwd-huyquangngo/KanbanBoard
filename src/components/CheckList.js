import React, {Component} from 'react';
import Task from './Task';
import PropTypes from 'prop-types';

class CheckList extends Component {
    checkInputKeyPress(evt) {
        if(evt.key === 'Enter') {
            //create a new task with taskName and temporatory ID
            let newTask = {
                id: Date.now(),
                name: evt.target.value,
                done: false
            };
            this.props.taskActions.addTask(this.props.cardId, newTask);
            evt.target.value = '';
        }
    }
    
    render() {
        let taskList  = this.props.tasks.map((task) => {
            return (
                <Task key={task.id}
                      cardId={this.props.cardId}
                      task={task}
                      taskActions={this.props.taskActions}
                />
            );
        });

        return (
            <div className="checklist">
                <ul>{taskList}</ul>
                <input type="text"
                        className="checklist--add-task"
                        placeholder="Type then hit Enter to add a task"
                        onKeyPress={this.checkInputKeyPress.bind(this)}
                />        
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId: PropTypes.number,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskActions: PropTypes.object,
};

export default CheckList;
