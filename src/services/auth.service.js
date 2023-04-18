import {Buffer} from 'buffer';
import config from '../config.json';
import { httpService } from '../services/http.service';

const url = config.API_URL + 'Auth';

const login = (credentials) => {
    return httpService.post(url, credentials);
}

const logout = () => {
    localStorage.removeItem('token');
}

const isLoggedIn = () => {
    const token = localStorage.getItem('token');

    if (token) {
        var encoded = token.split('.')[1];
        var decoded = Buffer.from(encoded, 'base64').toString();
        var payload = JSON.parse(decoded);
        //console.log(payload);

        if (payload.exp * 1000 > Date.now()) {
            return true;
        }
    }

    return false;
};

export const authService = {
    login,
    logout,
    isLoggedIn
};