import React, { Component } from "react";
import CardForm from "./CardForm";
import PropTypes from "prop-types";

class EditCard extends Component {
    componentWillMount() {
        let card = this.props.cards.find((card) => card.id == this.props.match.params.card_id);
        this.setState(card);
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.cardCallbacks.updateCard(this.state);
        this.props.history.push('/');
    }

    handleClose(e) {
        this.props.history.push('/');
    }

    render() {
        return(
            <CardForm draftCard={this.state}
                      buttonLabel="Edit Card"
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleClose={this.handleClose.bind(this)} />
        );
    }
}

EditCard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object),
    cardCallbacks: PropTypes.object,
};

export default EditCard;
