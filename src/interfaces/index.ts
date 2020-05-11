export type Data<T> = {
  data: T
};

export type Game = {
  name: string
  slug: string
  url: string
  image: string
  hero: string
};

export type ProjectType = {
  name: string
  slug: string
  gameSlug: string
};

export type Users = {
  userId: number
  username: string
  displayName: string
  avatarURL: string
  createdAt: number
}
export type Contributors = Users & {
  role: string
}

export type Categories = {
  slug: string
  name: string
  iconURL: string
}
export type Project = {
  id: number
  name: string
  slug: string
  summary: string
  description: string
  logo: string
  downloads: number
  createdAt: number
  updatedAt: number
  contributors: Contributors[]
  categories?: Categories[]
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
