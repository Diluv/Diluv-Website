import axios, { AxiosResponse } from "axios";
import { Session } from "../interfaces";

export function post(
    url: string,
    data: Record<string, unknown> | FormData | undefined,
    headers: any = {
        Accept: "application/json"
    }
): Promise<AxiosResponse> {
    return axios.post(url, data, {
        headers
    });
}

export function postAuthed(
    url: string,
    data: Record<string, unknown> | FormData,
    {
        headers = {
            Accept: "application/json"
        },
        session
    }: { headers?: any; session?: Session }
): Promise<AxiosResponse> {
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
): Promise<AxiosResponse> {
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
): Promise<AxiosResponse> {
    if (session) {
        headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return axios.get(url, {
        headers
    });
}
