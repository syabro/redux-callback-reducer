import { CALLBACK_ACTION } from './action';

export function createCallbackReducer(initReducerName, initialState = {}) {
    if (!initReducerName) {
        throw new SyntaxError('Improperly configured. initReducerName must be defined.');
    }

    return (state = initialState, { type, reducerName, callback, kwargs }) => {
        if (type === CALLBACK_ACTION && reducerName === initReducerName) {
            return callback(...kwargs, state);
        }
        return state;
    };
}
