import config from '../config.json';
import { httpService } from './http.service';

const url = config.API_URL + 'Users';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return httpService.get(url);
}

function getById(id) {
    return httpService.get(`${url}/${id}`);
}

function create(params) {
    return httpService.post(url, params);
}

function update(id, params) {
    return httpService.put(`${url}/${id}`, params);
}

function _delete(id) {
    return httpService.delete(`${url}/${id}`);
}