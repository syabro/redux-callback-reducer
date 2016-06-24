import { CALLBACK_ACTION } from './action';

export function createDecorator(store) {
    return (reducerName) => (target, property, descriptor) => {
        const value = createWrapper(store)(reducerName, descriptor.value);

        return {
            ...descriptor,
            value,
        };
    };
}

export function createWrapper(store) {
    return (reducerName, callback) => {
        if (typeof callback !== 'function') {
            throw new SyntaxError('Only functions can be reducer');
        }

        return (...kwargs) => {
            const action = {
                type: CALLBACK_ACTION,
                name: callback.name,
                callback,
                reducerName,
                kwargs,
            };

            return store.dispatch(action);
        };
    };
}
