import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { generateReducers, createCallbackReducer } from 'redux-callback-reducer';

export const rootReducer = combineReducers({
    routing,
    users: generateReducers('users', {
        items: [],
        isLoading: false
    }),
    admins: combineReducers({
        items: createCallbackReducer('admins.items', []),
        isLoading: createCallbackReducer('admins.isLoading', false),
    })
});
