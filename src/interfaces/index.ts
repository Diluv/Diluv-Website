export type Data<T> = {
  data: T
};

export interface Version {
  version: string
  type: string
  release: number
}

export interface GameData {
  slug: string
  name: string
  url: string
  logoURL: string
  bannerURL: string
  versions: Version[]
}

export interface ProjectType {
  name: string
  slug: string
  gameSlug: string
  maxFileSize: number
  projectCount: number
}

export interface ProjectData {
  name: string,
  slug: string,
  gameSlug: string
  maxFileSize: number,
  tags: Tag[],
  projectCount: number
}

export interface Project {
  id: number
  name: string
  slug: string
  summary: string
  description: string
  logo: string
  downloads: number
  createdAt: number
  updatedAt: number
  tags: Tag[]
  contributors: Contributors[]
}

export interface Tag {
  slug: string
  name: string
}

export type Game = {
  bannerURL: string
  logoURL: string
  name: string
  slug: string
  url: string
};

export interface Users {
  userId: number
  username: string
  displayName: string
  avatarURL: string
  createdAt: number
}

export interface Contributors extends Users {
  role: string
}

export type ProjectFiles = {
  name: string,
  sha512: string,
  crc32: string,
  size: number,
  changelog: string,
  createdAt: number,
  updatedAt: number,
};

export type Featured = {
  projects: Project[]
  games: Game[]
  projectCount: number
  contributorCount: number
};
