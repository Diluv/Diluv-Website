import axios from "axios";
import { Session } from "../interfaces";

export function post(
    url: string,
    data: any,
    headers: any = {
        Accept: "application/json"
    }
) {
    return axios.post(url, data, {
        headers
    });
}

export function postAuthed(
    url: string,
    data: any,
    {
        headers = {
            Accept: "application/json"
        },
        session
    }: { headers?: any; session?: Session }
) {
    if (session) {
        headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return axios.post(url, data, {
        headers
    });
}

export function get(
    url: string,
    headers: any = {
        Accept: "application/json"
    }
) {
    return axios.get(url, {
        headers
    });
}

export function getAuthed(
    url: string,
    {
        headers = {
            Accept: "application/json"
        },
        session
    }: { headers?: any; session?: Session }
) {
    if (session) {
        headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return axios.get(url, {
        headers
    });
}
