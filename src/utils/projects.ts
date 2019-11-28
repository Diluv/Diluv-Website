import fetch from 'isomorphic-unfetch'

import {API_URL} from './api';
import {Data, Project, ProjectFiles, ProjectType} from "../interfaces";

export async function getProjectTypesByGameSlug(gameSlug: string): Promise<ProjectType[]> {
  try {
    const data: Data<ProjectType[]> = await fetch(`${API_URL}/v1/games/${gameSlug}/types`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getProjectTypesByGameSlugAndProjectTypeSlug(gameSlug: string, projectTypeSlug: string): Promise<ProjectType> {
  try {
    const data: Data<ProjectType> = await fetch(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getProjectsByGameSlugAndProjectTypeSlug(gameSlug: string, projectTypeSlug: string): Promise<Project[]> {
  try {
    const data: Data<Project[]> = await fetch(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/projects`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}


export async function getProjectByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug: string, projectTypeSlug: string, projectSlug: string): Promise<Project> {
  try {
    const data: Data<Project> = await fetch(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/${projectSlug}`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}

export async function getProjectFilesByGameSlugAndProjectTypeSlugAndProjectSlug(gameSlug: string, projectTypeSlug: string, projectSlug: string): Promise<ProjectFiles[]> {
  try {
    const data: Data<ProjectFiles[]> = await fetch(`${API_URL}/v1/games/${gameSlug}/${projectTypeSlug}/${projectSlug}/files`).then(res => res.json());
    return data.data;
  } catch (err) {
    throw new Error(err.message)
  }
}
