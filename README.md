# redux-callback-reducer

redux-callback-reducer allows any function or class method to make a reducer for your state, without adding any additional actions.

## Installation

```
npm install --save redux-callback-reducer
```

## Tutorial 

To use `redux-callback-reducer` you need to configure your state using `generateReducers` or `createCallbackReducer`, prepare a decorator or wrapper function, and make your functions as state reducer.

> To use the decorator you need to configure [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)

### Configure state

You can use `generateReducers` to generate a nested state or generate your state using `combineReducers` from `redux` and `createCallbackReducer` from `redux-callback-reducer`

* Using `generateReducers`:

```javascript
import { combineReducers } from 'redux'
import { generateReducers } from 'redux-callback-reducer';

const rootReducer = combineReducers({
    users: generateReducers('users', {
        items: [],
        isLoading: false
    }),
});
```

* Using `combineReducers` and `createCallbackReducer`:

```javascript
import { combineReducers } from 'redux'
import { createCallbackReducer } from 'redux-callback-reducer';

const rootReducer = combineReducers({
    admins: combineReducers({
        items: createCallbackReducer('admins.items', []),
        isLoading: createCallbackReducer('admins.isLoading', false),
    })
});
```

* You can create a flat state using `createCallbackReducer`: 

```javascript
import { combineReducers } from 'redux'
import { createCallbackReducer } from 'redux-callback-reducer';

const rootReducer = combineReducers({
    admins: createCallbackReducer('admins', {}),
});
```

### Creating a wrapper or decorator

You need to create a wrapper for functions or decorator for methods.

* Wrapper:

```javascript
import { store } from './store';
import { createWrapper } from 'redux-callback-reducer';

export const wrapper = createWrapper(store);
```

* Decorator:

```javascript
import { store } from './store';
import { createDecorator } from 'redux-callback-reducer';

export const reducer = createDecorator(store);
```

### Using wrapper or decorator:

* Wrapper:

```javascript
import { wrapper } from '../wrapper';

export const setAdmins = wrapper('admins.items', (items, state) => items);

export const getAdmins = () => fetch('/api/admins/').then(setAdmins);
};
```

* Decorator:

```javascript
import { decorator as reducer } from '../decorator';

export class UserStateService { 
    static getUsers() {
        return fetch('/api/users/')
            .then(this.setUsers);
    }
    
    @reducer('users.items')
    static setUsers(users, state) {
        return users;
    }
}
```

* If you do not create nested state, you can write a reducer as follows:

```javascript
import { decorator as reducer } from '../decorator';

export class UserStateService { 
    static getUsers() {
        return fetch('/api/users/')
            .then(this.setUsers);
    }
    
    @reducer('users')
    static setUsers(items, state) {
        return {
            ...state,
            items,
        };
    }
}
```

## Example

- [example](/example/) - basic reference implementation

## API

#### `createCallbackReducer(reducerName, initialState)`


#### `generateReducers(reducerName, initialState)`


#### `createDecorator(store)`


#### `createWrapper(store)`
