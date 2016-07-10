import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserStateService } from 'domain/users/users_state_service';

@connect(mapStateToProps)
export class UsersList extends Component {
    constructor(props) {
        super(props);

        this.append = this.append.bind(this);
    }

    componentWillMount() {
        return UserStateService.getUsers();
    }

    append() {
        return UserStateService.getUser();
    }

    renderLoading() {
        const { isLoading } = this.props;

        if (!isLoading) {
            return null;
        }

        return (
            <strong>isLoading ...</strong>
        )
    }

    render() {
        const { users } = this.props;

        return (
            <div>
                <h1>Users list</h1>
                <form>
                    <button type="button" onClick={this.append}>Append new user</button>
                </form>
                <p>{this.renderLoading()}</p>
                <ul>
                    {
                        _.map(users, (user, index) =>
                            <li key={index}>{user.name.first} {user.name.last}</li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: UserStateService.usersSelector(state),
        isLoading: UserStateService.isLoadingSelector(state),
    }
}
