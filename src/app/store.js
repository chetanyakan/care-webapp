import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'Reducers';

const initialState = {};

const middleware = [thunk];

let args = [ applyMiddleware(...middleware),  ]
if(process.env.NODE_ENV !== 'development'){
    args.pop()
}

const store = createStore(
    rootReducer,
    initialState,
    compose(...args)
);


export default store;
