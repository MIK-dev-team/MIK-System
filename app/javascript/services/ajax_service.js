/**
 * Created by owlaukka on 15/07/17.
 */
import axios from 'axios';

// Wrapper class for ajax requests. Uses Axios, but can be changed to use any library to do requests if wanted.
class AjaxService {
    constructor() {
        let service = axios.create({
            headers: {csrf: 'token'}
        });
        // service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    handleSuccess(response) {
        return response;
    }

    // Left this here in case something like this is needed later as a template
    handleError = (error) => {
        switch (error.response.status) {
            // case 401:
            //     this.redirectTo(document, '/');
            //     break;
            // case 404:
            //     this.redirectTo(document, '/404');
            //     break;
            // default:
            //     this.redirectTo(document, '/500');
            //     break;
        }
        //return error;
        return Promise.reject(error)
    };

    redirectTo = (document, path) => {
        document.location = path;
    };

    get(path, callback, errorCallback) {
        return this.service.get(path)
            .then((response) => {
                callback(response.status, response.data)
            })
            .catch((err) => {
                errorCallback(err.response.status, err.response.data);
            });
    };

    patch(path, payload, callback, errorCallback) {
        return this.service.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => {
            callback(response.status, response.data)
        }).catch((err) => {
            errorCallback(err.response.status, err.response.data)
        })
    };

    post(path, payload, callback, errorCallback) {
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => {
            callback(response.status, response.data)
        }).catch((err) => {
            errorCallback(err.response.status, err.response.data)
        })
    };

    destroy(path, callback, errorCallback) {
        return this.service.request({
            method: 'DELETE',
            url: path,
            responseType: 'json'
        }).then((response) => {
            callback(response.status, response.data)
        }).catch((err) => {
            errorCallback(err.response.status, err.response.data)
        })
    };
}

export default new AjaxService;