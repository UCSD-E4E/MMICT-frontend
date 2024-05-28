export default class ApiService {
    static getApiServiceUrl(): string {
        console.log(`This is supposed to be webserver address: ${process.env.REACT_APP_API_ADDRESS}`)
        if (typeof process.env.REACT_APP_API_ADDRESS === 'undefined') {
            throw "API URL undefined!!"
        }

        return process.env.REACT_APP_API_ADDRESS;
    }
}