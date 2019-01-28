import axios from 'axios'

const apiUrl = 'http://localhost:3000/api/v1';

const authenticate = (email, password) => {
  debugger;
    const path = apiUrl + '/auth/sign_in';
    return new Promise((resolve, reject) => {
        axios.post(path, {
            email: email,
            password: password
        })
            .then(response => {
                console.log(response);
                sessionStorage.setItem('current_user', JSON.stringify({id: response.data.data.id}));
                storeAuthHeaders(response).then(() => {
                    resolve({
                        authenticated: true
                    })
                });
            })
            .catch(error => {
                reject(error)
            });
    })
};

const deAuthenticate = () => {
    const path = apiUrl + '/auth/sign_out';
    return new Promise((resolve, reject) => {
        axios.delete(path, {params: {}, headers: getAuthHeaders()})
            .then(() => {
                sessionStorage.clear();
                resolve()
            })
            .catch(error => {
                console.log(error);
                reject()

            })
    })
};

const storeAuthHeaders = ({headers}) => {
    return new Promise((resolve) => {
        const uid = headers['uid'],
            client = headers['client'],
            accessToken = headers['access-token'],
            expiry = headers['expiry'];

        sessionStorage.setItem('credentials', JSON.stringify({
            uid: uid,
            client: client,
            access_token: accessToken,
            expiry: expiry,
            token_type: 'Bearer'
        }));

        resolve(true)
    })
};


const getAuthHeaders = () => {
    return JSON.parse(sessionStorage.getItem('credentials'));
};

export {apiUrl, authenticate, deAuthenticate, storeAuthHeaders, getAuthHeaders}