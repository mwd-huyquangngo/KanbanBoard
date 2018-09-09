import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = (store) => (next) => (action) => {
    if(typeof action !== 'function') {
        console.log('dispatching: ', action);
    }

    return next(action);
}

const CardStore = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(logger, thunk)
    )
);

export default CardStore;
