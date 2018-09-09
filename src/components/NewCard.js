import React, { Component } from "react";
import CardForm from "./CardForm";
import PropTypes from "prop-types";

class NewCard extends Component {
    componentWillMount() {
        this.setState({
            id: Date.now(),
            title: '',
            description: '',
            status: 'todo',
            color: '#c9c9c9',
            tasks: []
        });
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.cardActions.addCard(this.state);
        this.props.history.push('/');
    }

    handleClose(e) {
        this.props.history.push('/');
    }

    render() {
        return(
            <CardForm draftCard={this.state}
                      buttonLabel="Create Card"
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleClose={this.handleClose.bind(this)} />
        );
    }
}

NewCard.propTypes = {
    cardActions: PropTypes.object,
};

export default NewCard;
