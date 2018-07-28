import React, {Component} from 'react';
import Task from './Task';
import PropTypes from 'prop-types';

class CheckList extends Component {
    checkInputKeyPress(evt) {
        if(evt.key === 'Enter') {
            this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
            evt.target.value = '';
        }
    }
    
    render() {
        let taskList  = this.props.tasks.map((task, taskIndex) => {
            return (
                <Task key={task.id}
                      cardId={this.props.cardId}
                      taskId={task.id}
                      name={task.name}
                      isChecked={task.done}
                      taskCallbacks={this.props.taskCallbacks}
                      taskIndex={taskIndex}
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
    taskCallbacks: PropTypes.object,
};

export default CheckList;