import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

export class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
    };

    render() {
        const { store, history, routes } = this.props;

        return (
            <Provider store={store}>
                <Router history={history}>
                    {routes}
                </Router>
            </Provider>
        )
    }
}
