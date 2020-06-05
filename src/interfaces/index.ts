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
    tags: Tag[]
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

export interface Sort {
    slug: string,
    displayName: string
}
export type Game = {
    bannerURL: Picture
    logoURL: Picture
    name: string
    slug: string
    url: string
};

export interface Picture {
    fallback: PictureSource,
    sources: PictureSource[]
}

export interface PictureSource {
    src: string
    type: string
}

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
    featuredProjects: Project[]
    featuredGames: Game[]
    projectCount: number
    contributorCount: number
};


export interface SelectData {
    value: string,
    label: string,

}