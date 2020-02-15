import {API_URL} from './api';
import {Data, Project, ProjectFiles, ProjectType} from "../interfaces";
import {get} from "./request";

export async function getProjectTypesByGameSlug(gameSlug: string): Promise<ProjectType[]> {
  try {
    const data: Data<ProjectType[]> = await get(`${API_URL}/v1/games/${gameSlug}/types`).then(Response => Promise.resolve(Response.data).catch(reason => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getProjectTypesByGameSlugAndProjectTypeSlug(gameSlug: string, projectTypeSlug: string): Promise<ProjectType> {
  try {
    const data: Data<ProjectType> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}`).then(Response => Promise.resolve(Response.data).catch(reason => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getProjectsByGameSlugAndProjectTypeSlug(gameSlug: string, projectTypeSlug: string): Promise<Project[]> {
  try {
    const data: Data<Project[]> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/projects`).then(Response => Promise.resolve(Response.data).catch(reason => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}


export async function getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug: string, projectTypeSlug: string, projectSlug: string): Promise<Project> {
  try {
    const data: Data<Project> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/${projectSlug}`).then(Response => Promise.resolve(Response.data).catch(reason => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug: string, projectTypeSlug: string, projectSlug: string): Promise<ProjectFiles[]> {
  try {
    const data: Data<ProjectFiles[]> = await get(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/${projectSlug}/files`).then(Response => Promise.resolve(Response.data).catch(reason => Promise.resolve(reason)));
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}
