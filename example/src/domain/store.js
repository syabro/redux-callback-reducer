import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers'

export const store = createStore(rootReducer, {}, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));
