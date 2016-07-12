import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { store } from './domain/store';
import { Root } from './views/root';
import { makeRoutes } from './routes';

const routes = makeRoutes(store);

const container = document.createElement('div');
container.id = 'root';
document.body.appendChild(container);

render(
    <Root store={store} history={hashHistory} routes={routes}/>,
    document.getElementById('root')
);
