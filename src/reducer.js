import _ from 'lodash';
import { combineReducers } from 'redux';
import { CALLBACK_ACTION_SUFFIX } from './action';

export function createCallbackReducer(initReducerName, initialState = {}) {
    if (!initReducerName) {
        throw new SyntaxError('Improperly configured. initReducerName must be defined.');
    }

    return (state = initialState, { type, reducerName, callback, kwargs }) => {
        if (type.endsWith(CALLBACK_ACTION_SUFFIX) && reducerName === initReducerName) {
            return callback(...kwargs, state);
        }
        return state;
    };
}

export function generateReducers(path, obj) {
    if (!_.isPlainObject(obj)) {
        throw new SyntaxError('Only plain object must be here.');
    }

    return combineReducers(_.mapValues(obj, (value, key) => {
        if (_.isPlainObject(value) && _.keys(value).length) {
            return generateReducers(`${path}.${key}`, value);
        }

        return createCallbackReducer(`${path}.${key}`, value);
    }));
}
