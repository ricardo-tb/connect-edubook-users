
import config  from './../config.js';
import miFetch from './miFetch.js';

function connect_api($user, $pass){
    return new Promise((resolve, reject) => {
        let client_id = config.client.id;
        let client_secret = config.client.secret;
        let url = 'http://user.vicensvivesdigital.com/oauth/token';
        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("username", $user);
        params.append("password", $pass);
        let hdrs = {};
        let tokenHeader = 'Authorization';
        // basic auth
        hdrs[tokenHeader] = 'Basic ' + Buffer.from(`${client_id}:${client_secret}`, 'binary').toString('base64')
        hdrs['Content-Type'] = 'application/x-www-form-urlencoded';
        let opts = {
            method: 'POST',
            headers: hdrs,
            body:params
        }
        miFetch(url, opts).then((resp) => {
            resolve(resp);
        }, (error) => {
            reject(error);
        })
    });
}

function connect_token(token){
    return new Promise((resolve, reject) => {
        let url = 'http://user.vicensvivesdigital.com/me';
        let hdrs = {};
        let tokenHeader = 'Authorization';
        hdrs[tokenHeader] = 'Bearer ' + token
        let opts = {
            method: 'GET',
            headers: hdrs
        }
        miFetch(url, opts).then((resp) => {
            resolve(resp);
        }, (error) => {
            reject(error);
        })
    });
}

export {
    connect_api,
    connect_token
};

