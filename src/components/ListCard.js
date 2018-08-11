import React, {Component} from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import constants from '../constants/constants';

const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id)
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

        let cards = this.props.cards.map((card) => {
            return (
                <Card key={card.id}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    {...card}      
                />
            );
        });
        
        return connectDropTarget(
            <div className="list-card">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

ListCard.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(ListCard);
