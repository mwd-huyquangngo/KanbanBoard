import React, {Component} from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

class ListCard extends Component {
    render() {
        let cards = this.props.cards.map((card) => {
            return (
                <Card key={card.id}
                    taskCallbacks={this.props.taskCallbacks}
                    {...card}      
                />
            );
        });
        
        return (
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
};

export default ListCard;