import fetch from 'isomorphic-unfetch'

import {API_URL} from './api';
import {Data, Game} from "../interfaces";

export async function getGames(): Promise<Game[]> {
  try {
    const data: Data<Game[]> = await fetch(`${API_URL}/v1/games`).then(res => res.json());
    console.log(data);
    return data.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message)
  }
}

export async function getGamesBySlug(slug: string): Promise<Game> {
  try {
    const data: Data<Game> = await fetch(`${API_URL}/v1/games/${slug}`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}
