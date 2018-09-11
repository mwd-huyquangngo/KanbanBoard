import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Task extends Component {
    render() {
        return (
            <li key={this.props.taskId} className="checklist__task">
                <input type="checkbox" defaultChecked={this.props.isChecked} 
                // onChange={this.props.taskActions.toggle.bind(null, this.props.cardId, this.props.taskId, this.props.taskIndex)} 
                />
                {this.props.name}{' '}
                <a href="#" className="checklist__task--remove" 
                    // onClick={this.props.taskActions.delete.bind(null, this.props.cardId, this.props.taskId, this.props.taskIndex)} 
                />
            </li>
        );
    }
}

Task.propTypes = {
    cardId: PropTypes.number,
    taskId: PropTypes.number,
    name: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired
};

export default Task;