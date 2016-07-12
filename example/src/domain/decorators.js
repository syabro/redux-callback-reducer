import { store } from './store';
import { createDecorator, createWrapper } from 'redux-callback-reducer';

export const reducer = createDecorator(store);
export const wrapper = createWrapper(store);
