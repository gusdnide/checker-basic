const axios = require("axios");

module.exports = {
    fetch: (url, options) => new Promise(
        (resolve, reject) => axios({
            url,
            ...options,
            data: options.body,
            validateStatus: false,
            withCredentials: true
        }).then(r => {
            resolve({
                status: r.status,
                data: r.data,
                headers: r.headers
            })
        }).catch(e => {
            resolve({
                error: true,
                data: e.message
            })
        })),
    
}