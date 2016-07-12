import React, { Component } from 'react';
import { Link } from 'react-router'

export class Base extends Component {
    static propTypes = {
        children: React.PropTypes.object,
    };

    render() {
        return (
            <div>
                <nav>
                    <Link to="/">Root</Link><br />
                    <Link to="/users_list">Users list</Link><br />
                    <Link to="/admins_list">Admins list</Link>
                </nav>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
