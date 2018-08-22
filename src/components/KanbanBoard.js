import React, {Component} from 'react';
import ListCard from './ListCard';
import PropTypes from 'prop-types';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import NewCard from './NewCard';
import EditCard from './EditCard';
import { Switch, Route, Link } from "react-router-dom";

class KanbanBoard extends Component {
    render() {
        // let cardModal = this.props.children && React.cloneElement(this.props.children, {
        //     cards: this.props.cards,
        //     cardCallbacks: this.props.cardCallbacks
        // });

        return (
            <div className="app">
                <Link to='/new' className="float-button">+</Link>
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
                {/* {cardModal} */}
                <Switch>
                    <Route path='/new' render={(props) => (
                        <NewCard {...props} cardCallbacks={this.props.cardCallbacks} />
                    )} />
                    <Route path='/edit/:card_id' render={(props) => (
                        <EditCard {...props} cards={this.props.cards} cardCallbacks={this.props.cardCallbacks} />
                    )} />
                </Switch>
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
