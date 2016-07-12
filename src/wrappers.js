import _ from 'lodash';
import { CALLBACK_ACTION_SUFFIX } from './action';

export function createDecorator(store) {
    return (reducerName, callbackName) => (target, property, descriptor) => ({
        ...descriptor,
        value: createWrapper(store)(reducerName, descriptor.value, callbackName),
    });
}

export function createWrapper(store) {
    return (reducerName, callback, callbackName) => {
        if (typeof callback !== 'function') {
            throw new SyntaxError('Only functions can be reducer');
        }

        const type = getCallbackType(callbackName || callback.name);

        return (...kwargs) => {
            const action = {
                type,
                callback,
                reducerName,
                kwargs,
            };

            return store.dispatch(action);
        };
    };
}

function getCallbackType(callbackName) {
    return callbackName ?
        `${_.toUpper(_.snakeCase(callbackName))}_${CALLBACK_ACTION_SUFFIX}` :
        `ANONYMOUS_${CALLBACK_ACTION_SUFFIX}`;
}