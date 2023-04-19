import config from '../config.json';
import { HttpService } from './http.service';

const url = config.API_URL + 'Users';

export const UserService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return HttpService.get(url);
}

function getById(id) {
    return HttpService.get(`${url}/${id}`);
}

function create(params) {
    return HttpService.post(url, params);
}

function update(id, params) {
    return HttpService.put(`${url}/${id}`, params);
}

function _delete(id) {
    return HttpService.delete(`${url}/${id}`);
}