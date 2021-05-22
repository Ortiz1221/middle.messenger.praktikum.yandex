import { queryStringify } from '../queryStringify/queryStringify.js';

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

interface IOptions {
    timeout? : number,
    method? : string,
    headers? : {
        [key: string]: string
    },
    data? : {}

}

export class HTTPTransport {
    get = (url: string, options: IOptions = {}) => {
        return this.request(url, {
            ...options,
            method: METHODS.GET
        }, options.timeout);
    };

    sendData = (url: string, method: "PUT" | "POST", data: {}) => {
        return this.request(url, {
            method,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Set-Cookie': 'HttpOnly'
            },
            data: JSON.stringify(data)
        })
    }

    request = (url: string, options: IOptions = {}, timeout: number = 0) => {
        const {
            headers = {'Set-Cookie': 'HttpOnly'}, method, data
        } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;
            xhr.withCredentials = true;

            xhr.open(
                method,
                isGet && !!data ?
                `${url}${queryStringify(data)}` :
                url
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                //@ts-ignore
                xhr.send(data);
            }
        });
    };
}