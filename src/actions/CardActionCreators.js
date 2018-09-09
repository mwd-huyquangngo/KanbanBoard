import constants from '../constants/constants';
import KanbanAPI from '../api/KanbanAPI';
import { throttle } from '../utils/utils';

let CardActionCreators = {
    //thunk action creator
    fetchCards() {
        return (dispatch) => {
            dispatch({type: constants.FETCH_CARDS});
            KanbanAPI.fetchCards().then(
                (response) => dispatch({type: constants.FETCH_CARDS_SUCCESS, cards: response}),
                (error) => dispatch({type: constants.FETCH_CARDS_ERROR, payload: error})
            );
        }
    },

    addCard(card) {
        return (dispatch) => {
            dispatch({type: constants.CREATE_CARD, card: card});
            KanbanAPI.addCard(card).then(
                (response) => dispatch({type: constants.CREATE_CARD_SUCCESS, createdCard: response, oldCard: card}),
                (error) => dispatch({type: constants.CREATE_CARD_ERROR, card: card})
            );
        }
    },

    updateCard(card) {
        return (dispatch) => {
            dispatch({type: constants.UPDATE_CARD});
            KanbanAPI.updateCard(card).then(
                (response) => dispatch({type: constants.UPDATE_CARD_SUCCESS, updatedCard: card}),
                (error) => dispatch({type: constants.UPDATE_CARD_ERROR})
            );
        }
    },

    updateCardStatus: throttle((cardId, listId) => {
        return {
            type: constants.UPDATE_CARD_STATUS,
            payload: {cardId, listId}
        };
    }),

    updateCardPosition: throttle((cardId, afterId) => {
        return {
            type: constants.UPDATE_CARD_POSITION,
            payload: {cardId, afterId}
        };
    }, 500),

    persistCardDrag(changedCard, cardProps, index) {
        return (dispatch) => {
            dispatch({type: constants.PERSIST_CARD_DRAG});
            KanbanAPI.persistCardDrag(changedCard, cardProps, index).then(
                (response) => dispatch({type: constants.PERSIST_CARD_DRAG_SUCCESS, card: response}),
                (error) => dispatch({type: constants.PERSIST_CARD_DRAG_ERROR, card: cardProps})
            );
        };
    }


};

export default CardActionCreators;
