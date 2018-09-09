import React, {Component} from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import constants from '../constants/constants';

const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardActions.updateCardStatus(draggedId, props.id)
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class ListCard extends Component {
    render() {
        const { connectDropTarget } = this.props;

        let filterCards = this.props.filterCards.map((card) => {
            return (
                <Card key={card.id}
                    taskCallbacks={this.props.taskCallbacks}
                    cardActions={this.props.cardActions}
                    cards={this.props.cards}
                    {...card}
                />
            );
        });
        
        return connectDropTarget(
            <div className="list-card">
                <h1>{this.props.title}</h1>
                {filterCards}
            </div>
        );
    }
}

ListCard.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    filterCards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardActions: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(ListCard);
