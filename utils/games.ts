import fetch from 'isomorphic-unfetch'

import {API_URL} from './api';
import {Data, Game} from "../interfaces";

export async function getGames(): Promise<Game[]> {
  try {
    const data: Data<Game[]> = await fetch(API_URL + '/games').then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getGamesBySlug(slug: string): Promise<Game> {
  try {
    const data: Data<Game> = await fetch(`${API_URL}/games/${slug}`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}
