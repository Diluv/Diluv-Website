export type Data<T> = {
    data: T;
};

export interface HasTheme {
    theme: Theme;
}

export interface HasSession {
    session?: Session;
}

export interface HasMarkdown {
    title: string;
    pageContents: string;
}

export interface Version {
    version: string;
    type: string;
    release: number;
}

export interface GameData {
    slug: string;
    name: string;
    url: string;
    logoURL: string;
    bannerURL: string;
    versions: Version[];
}

export interface ProjectTypeBase {
    name: string;
    slug: string;
}

export interface ProjectType extends ProjectTypeBase {
    gameSlug: string;
    maxFileSize: number;
    tags: Tag[];
    projectCount: number;
}

export interface ProjectFile {
    id: number;
    name: string;
    size: number;
    sha512: string;
    releaseType: string;
    classifier: string;
    createdAt: number;
    gameVersions: Version[];
    gameSlug: string;
    projectTypeSlug: string;
    projectSlug: string;
    uploaderUserId: number;
    uploaderUsername: string;
    downloadURL: string;
}

export interface Project {
    id: number;
    name: string;
    slug: string;
    summary: string;
    description: string;
    logo: string;
    downloads: number;
    createdAt: number;
    updatedAt: number;
    tags: Tag[];
    game: GameBase;
    projectType: ProjectType;
    contributors: Contributors[];
    links: Link[];
    permissions?: string[];
    released?: boolean;
    review?: boolean;
}

export interface Link {
    type: string;
    url: string;
}

export interface Tag {
    slug: string;
    name: string;
}

export interface Sort {
    slug: string;
    displayName: string;
}

export interface GameBase {
    name: string;
    slug: string;
}

export interface Game extends GameBase {
    logoURL: Picture;
    url: string;
    defaultProjectType: string;
}

export interface Picture {
    fallback: PictureSource;
    sources: PictureSource[];
}

export interface PictureSource {
    src: string;
    type: string;
}

export interface User {
    userId: number;
    username: string;
    displayName: string;
    avatarURL: string;
    createdAt: number;
}

export interface Contributors extends User {
    role: string;
}

export type ProjectFiles = {
    name: string;
    sha512: string;
    crc32: string;
    size: number;
    changelog: string;
    createdAt: number;
    updatedAt: number;
};

export interface Featured {
    featuredGames: Game[];
    projectCount: number;
    contributorCount: number;
    projectTypeCount: number;
    gameCount: number;
}

export interface SelectData {
    value: string;
    label: string;
}

export interface Theme {
    theme: string;
}

export interface AuthorPage {
    projects: Project[];
    user: User;
    sort: Sort[];
    projectCount: number;
}

export interface Session {
    user: SessionUser;
    expires: string;
    accessToken: string;
}

export interface SessionUser {
    name: string;
    email: string;
    image: string;
    id: string;
}
