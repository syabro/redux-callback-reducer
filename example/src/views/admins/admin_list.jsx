import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AdminStateService from 'domain/admins/admins_state_service';

@connect(mapStateToProps)
export class AdminsList extends Component {
    constructor(props) {
        super(props);

        this.append = this.append.bind(this);
    }

    componentWillMount() {
        return AdminStateService.getAdmins();
    }

    append() {
        return AdminStateService.getAdmin();
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
        const { admins } = this.props;

        return (
            <div>
                <h1>Admins list</h1>
                <form>
                    <button type="button" onClick={this.append}>Append new admin</button>
                </form>
                <p>{this.renderLoading()}</p>
                <ul>
                    {
                        _.map(admins, (admin, index) =>
                            <li key={index}>{admin.name.first} {admin.name.last}</li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        admins: AdminStateService.adminsSelector(state),
        isLoading: AdminStateService.isLoadingSelector(state),
    }
}
