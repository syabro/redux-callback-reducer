import { Base } from './views/base';
import { UsersList } from './views/users/user_list';
import { AdminsList } from './views/admins/admin_list';

export const makeRoutes = (store) => ({
    component: Base,
    path: '/',
    childRoutes: [
        {
            component: UsersList,
            path: 'users_list',
        },
        {
            component: AdminsList,
            path: 'admins_list',
        }
    ],
});
