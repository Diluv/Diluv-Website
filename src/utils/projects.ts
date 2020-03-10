import { API_URL } from './api';
import {
  Data, Project, ProjectFiles, ProjectType,
} from '../interfaces';
import { get } from './request';


export async function getProjectType(gameSlug: string, projectTypeSlug: string): Promise<ProjectType> {
  try {
    const data: Data<ProjectType> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}`)
      .then((Response) => Promise.resolve(Response.data).catch((reason) => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function getProjects(gameSlug: string, projectTypeSlug: string, page = 1, limit = 20): Promise<Project[]> {
  try {
    let cursor = encodeURI(new Buffer(JSON.stringify({offset: (page-1)*limit})).toString("base64"));
    const data: Data<Project[]> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/projects?cursor=${cursor}&limit=${limit}`)
      .then((Response) => Promise.resolve(Response.data).catch((reason) => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getProjectTypesByGameSlug(gameSlug: string | string[]): Promise<ProjectType[]> {
  try {
    const data: Data<ProjectType[]> = await get(`${API_URL}/v1/games/${gameSlug}/types`)
      .then((Response) => Promise.resolve(Response.data)
        .catch((reason) => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getProjectTypesByGameSlugAndProjectTypeSlug(
  gameSlug: string | string[],
  projectTypeSlug: string | string[],
): Promise<ProjectType> {
  try {
    const data: Data<ProjectType> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}`)
      .then((Response) => Promise.resolve(Response.data).catch((reason) => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getProjectsByGameSlugAndProjectTypeSlug(
  gameSlug: string | string[],
  projectTypeSlug: string | string[],
): Promise<Project[]> {
  try {
    const data: Data<Project[]> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/projects`)
      .then((Response) => Promise.resolve(Response.data).catch((reason) => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}


export async function getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(
  gameSlug: string | string[],
  projectTypeSlug: string | string[],
  projectSlug: string | string[],
): Promise<Project> {
  try {
    const data: Data<Project> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/${projectSlug}`)
      .then((Response) => Promise.resolve(Response.data).catch((reason) => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug(
  gameSlug: string | string[],
  projectTypeSlug: string | string[],
  projectSlug: string | string[],
): Promise<ProjectFiles[]> {
  try {
    const data: Data<ProjectFiles[]> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/${projectSlug}/files`)
      .then((Response) => Promise.resolve(Response.data).catch((reason) => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
