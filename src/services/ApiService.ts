export default class ApiService {
    static getApiServiceUrl(): string {
        if (typeof process.env.REACT_APP_API_SERVER_URL === 'undefined') {
            throw "API URL undefined"
        }

        return process.env.REACT_APP_API_SERVER_URL;
    }
}