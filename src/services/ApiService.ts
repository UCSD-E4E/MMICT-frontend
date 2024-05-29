export default class ApiService {
    static getApiServiceUrl(): string {
        console.log(`This is supposed to be the NGINX server address: ${window._env_.REACT_APP_NGINX_ADDRESS}`)
        if (typeof window._env_.REACT_APP_NGINX_ADDRESS === 'undefined') {
            throw "API URL undefined!!"
        }

        return window._env_.REACT_APP_NGINX_ADDRESS;
    }
}