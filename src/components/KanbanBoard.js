import React, {Component} from 'react';
import ListCard from './ListCard';
import PropTypes from 'prop-types';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class KanbanBoard extends Component {
    render() {
        return (
            <div className="app">
                <ListCard id='todo' title='To Do' 
                    cards={this.props.cards.filter((card) => {return card.status === "todo"})} 
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                />
                <ListCard id='in-progress' title='In Progress' 
                    cards={this.props.cards.filter((card) => {return card.status === "in-progress"})}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                />
                <ListCard id='done' title='Done' 
                    cards={this.props.cards.filter((card) => {return card.status === "done"})}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                />
            </div>
        );
    }
}

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
