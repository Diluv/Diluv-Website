import {API_URL} from './api';
import {Data, Game} from "../interfaces";
import {get, post} from "./request";

export async function getGames(): Promise<Game[]> {
  try {
    const data: Data<Game[]> = await get(`${API_URL}/v1/games`).then(Response => Promise.resolve(Response.data).catch(reason => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getGamesBySlug(slug: string): Promise<Game> {
  try {
    const data: Data<Game> = await get(`${API_URL}/v1/games/${slug}`).then(Response => Promise.resolve(Response.data).catch(reason => Promise.resolve(reason)));//fetch(`${API_URL}/v1/games/${slug}`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}
