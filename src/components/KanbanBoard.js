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
                    filterCards={this.props.cards.filter((card) => {return card.status === "todo"})}
                    taskActions={this.props.taskActions}
                    cardActions={this.props.cardActions}
                    cards={this.props.cards}
                />
                <ListCard id='in-progress' title='In Progress' 
                    filterCards={this.props.cards.filter((card) => {return card.status === "in-progress"})}
                    taskActions={this.props.taskActions}
                    cardActions={this.props.cardActions}
                    cards={this.props.cards}
                />
                <ListCard id='done' title='Done' 
                    filterCards={this.props.cards.filter((card) => {return card.status === "done"})}
                    taskActions={this.props.taskActions}
                    cardActions={this.props.cardActions}
                    cards={this.props.cards}
                />
                {/* {cardModal} */}
                <Switch>
                    <Route path='/new' render={(props) => (
                        <NewCard {...props} cardActions={this.props.cardActions} />
                    )} />
                    <Route path='/edit/:card_id' render={(props) => (
                        <EditCard {...props} cards={this.props.cards} cardActions={this.props.cardActions} />
                    )} />
                </Switch>
            </div>
        );
    }
}

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    filterCards: PropTypes.arrayOf(PropTypes.object),
    taskActions: PropTypes.object,
};

export default DragDropContext(HTML5Backend)(KanbanBoard);
