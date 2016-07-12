import _ from 'lodash';

export class AdminApiService {
    static getAll() {
        return fetch('https://randomuser.me/api/?results=10')
            .then((response) => response.json())
            .then((data) => data.results);
    }

    static getOne() {
        return fetch('https://randomuser.me/api/?results=1')
            .then((response) => response.json())
            .then((data) => _.first(data.results));
    }
}
