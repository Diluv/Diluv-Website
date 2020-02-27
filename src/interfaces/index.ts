export type Data<T> = {
  data: T
};

export type Game = {
  name: string
  slug: string
  url: string
};

export type ProjectType = {
  name: string
  slug: string
  gameSlug: string
};

export type Project = {
  name: string
  author: string
  slug: string
  summary: string
  description: string
  logo: string,
  cachedDownloads: number,
  createdAt: number,
  updatedAt: number
};

export type ProjectFiles = {
  name: string,
  sha512: string,
  crc32: string,
  size: number,
  changelog: string,
  createdAt: number,
  updatedAt: number,
};

export type Login = {
  accessToken: string,
  refreshToken: string,
  expiredAt: number,
  refreshExpiredAt: number
};

export type AccessToken = {
  username: string
};
