import "whatwg-fetch";

const API_URL = 'http://kanbanapi.pro-react.com';

const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'huy.quang.ngo',
};

let KanbanAPI = {
    fetchCards() {
        return fetch(`${API_URL}/cards`, {headers: API_HEADERS})
        .then((response) => response.json());
    },

    addCard(card) {
        return fetch(`${API_URL}/cards`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(card)
        })
        .then((response) => response.json());
    },

    updateCard(card) {
        return fetch(`${API_URL}/cards/${card.id}`, {
            method: 'PUT',
            headers: API_HEADERS,
            body: JSON.stringify(card)
        });
    },

    persistCardDrag(changedCard, cardProps, index) {
        return fetch(`${API_URL}/cards/${cardProps.id}`, {
            method: 'PUT',
            headers: API_HEADERS,
            body: JSON.stringify({status: changedCard.status, color: changedCard.color, row_order_position: index})
        });
    },

    // addTask(cardId, task) {
    //     return fetch(`${API_URL}/cards/${cardId}/tasks`, {
    //         method: 'post',
    //         headers: API_HEADERS,
    //         body: JSON.stringify(task)
    //     })
    //     .then((response) => response.json());
    // },

    // deleteTask(cardId, taskId) {
    //     return fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
    //         method: 'delete',
    //         headers: API_HEADERS
    //     });
    // }, 

    // toggleTask(cardId, task) {
    //     fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
    //         method: 'put',
    //         headers: API_HEADERS,
    //         body: JSON.stringify({done:!task.done})
    //     });
    // }
};

export default KanbanAPI;