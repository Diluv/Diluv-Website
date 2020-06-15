import axios from "axios";


export function post(url: string, data: any, headers: any = {
    Accept: "application/json"
}) {
    return axios.post(url, data, {
        headers
    });
}

export function get(url: string, headers: any = {
    Accept: "application/json"
}) {
    return axios.get(url, {
        headers
    });
}
