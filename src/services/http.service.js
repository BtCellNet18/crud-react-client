export const HttpService = {
    get,
    post,
    put,
    delete: _delete
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: getAuthHeader()
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: getAuthHeader()
    };
    if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
    }      
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: getAuthHeader()
    };
    if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
    }    
    return fetch(url, requestOptions).then(handleResponse);    
}

function _delete(url) {
    const requestOptions = {
        method: 'DELETE',
        headers: getAuthHeader()
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // HTTP 401 Unauthorized
        if (!response.ok && response.status === 401) {
            console.log(response);
            localStorage.removeItem('token');
        }

        return data;
    });
}

function getAuthHeader() {
    const token = localStorage.getItem('token');

    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }   
}