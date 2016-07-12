import _ from 'lodash';
import { reducer } from '../decorators';
import { UserApiService } from './users_api_services';

export class UserStateService {
    static getUsers() {
        this.setIsLoading(true);

        return UserApiService.getAll()
            .then(this.setUsers)
            .then(() => this.setIsLoading(false));
    }

    static getUser() {
        this.setIsLoading(true);

        return UserApiService.getOne()
            .then(this.addUser)
            .then(() => this.setIsLoading(false));
    }

    @reducer('users.isLoading')
    static setIsLoading(loading) {
        return loading;
    }

    @reducer('users.items')
    static setUsers(users) {
        return users;
    }

    @reducer('users.items')
    static addUser(user, state) {
        return [
            ...state,
            user,
        ];
    }

    static usersSelector(state) {
        return _.get(state, 'users.items', []);
    }

    static isLoadingSelector(state) {
        return _.get(state, 'users.isLoading', false);
    }
}

