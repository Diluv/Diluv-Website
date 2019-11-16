import fetch from 'isomorphic-unfetch'

import {API_URL} from './api';
import {Data, ProjectType} from "../interfaces";

export async function getProjectTypesByGameSlug(slug: string): Promise<ProjectType[]> {
  try {
    const data: Data<ProjectType[]> = await fetch(`${API_URL}/games/${slug}/types`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}
