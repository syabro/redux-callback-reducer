import _ from 'lodash';
import { wrapper } from '../decorators';
import { AdminApiService } from './admins_api_services';

export const setIsLoading = wrapper('admins.isLoading', (loading) => loading, 'setIsLoading');

export const setAdmins = wrapper('admins.items', (items) => items, 'setAdmins');

export const addAdmin = wrapper('admins.items', (user, state) => [...state, user], 'addAdmin');

export const getAdmins = () => {
    setIsLoading(true);

    return AdminApiService.getAll()
        .then(setAdmins)
        .then(() => setIsLoading(false));
};

export const getAdmin = () => {
    setIsLoading(true);

    return AdminApiService.getOne()
        .then(addAdmin)
        .then(() => setIsLoading(false));
};

export const adminsSelector = (state) => _.get(state, 'admins.items', []);

export const isLoadingSelector = (state) => _.get(state, 'admins.isLoading', false);
