import React from 'react';
import ReactDOM from 'react-dom';
import KanbanBoardContainer from './containers/KanbanBoardContainer';

/*
let cardsList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the **whole** book",
        color: "#BD8D31",
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
        color: "#3A7E28",
        status: "todo",
        tasks: [
            {
                id: 1,
                name: "ContactList Example",
                done: true
            },
            {
                id: 2,
                name: "Kanban Example",
                done: false
            },
            {
                id: 3,
                name: "My own experiments",
                done: false
            }
        ]
    },
    {
        id: 3,
        title: "This is a very long title for this card, thus having more than 80 characters. That's invalid!",
        description: "I should read the **whole** book",
        color: "#3A7E28",
        status: "todo",
        tasks: []
    },
];
*/

ReactDOM.render(<KanbanBoardContainer />, document.getElementById('root'));