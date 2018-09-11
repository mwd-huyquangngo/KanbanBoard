import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Task extends Component {
    render() {
        return (
            <li key={this.props.task.taskId} className="checklist__task">
                <input type="checkbox" defaultChecked={this.props.task.done} 
                    onChange={this.props.taskActions.toggleTask.bind(null, this.props.cardId, this.props.task)} 
                />
                {this.props.task.name}{' '}
                <a href="#" className="checklist__task--remove" 
                    onClick={this.props.taskActions.deleteTask.bind(null, this.props.cardId, this.props.task)} 
                />
            </li>
        );
    }
}

Task.propTypes = {
    cardId: PropTypes.number,
    task: PropTypes.object.isRequired,
};

export default Task;
