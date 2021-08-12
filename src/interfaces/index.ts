import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export type Data<T> = {
    data: T;
};

export interface HasMarkdown {
    title: string;
    pageContents: string;
}

export interface Version {
    version: string;
    type: string;
    releasedAt: number;
}

export interface ProjectType extends SlugName {
    game: SlugName;
    maxFileSize: number;
    tags: SlugName[];
    projectCount: number;
}

export interface GameData extends SlugName{
    url: string;
    logo: GamePicture;
    projectTypes: ProjectType[];
    versions: Version[];
    projectCount: number;
    defaultProjectType: string;
}

export interface ProjectFile {
    id: number;
    name: string;
    size: number;
    sha512: string;
    releaseType: string;
    classifier: string;
    createdAt: string;
    changelog: string;
    gameVersions: Version[];
    gameSlug: string;
    projectTypeSlug: string;
    projectSlug: string;
    user: User;
    downloadURL: string;
    downloads: number;
    dependencies: ProjectFileDependency[];
}

export interface ProjectFileDependency {
    project: Project;
    type: string;
}

export interface Project extends SlugName {
    id: number;
    summary: string;
    description: string;
    logo: Picture;
    downloads: number;
    createdAt: string;
    updatedAt: string;
    tags: SlugName[];
    game: SlugName;
    projectType: ProjectType;
    authors: Authors[];
    owner: User;
    links: Link[];
    permissions?: string[];
    released?: boolean;
    review?: boolean;
}

export interface Link {
    type: string;
    url: string;
}

export interface SlugName {
    slug: string;
    name: string;
}

export interface Game extends SlugName {
    logo: GamePicture;
    url: string;
    defaultProjectType: string;
}

export interface GamePicture {
    logoURL: Picture;
    backgroundURL: Picture;
    foregroundURL: Picture;
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
    avatar: Picture;
    createdAt: string;
}

export interface Authors extends User {
    role: string;
}

export type ProjectFiles = {
    name: string;
    sha512: string;
    crc32: string;
    size: number;
    changelog: string;
    createdAt: string;
    updatedAt: string;
};

export interface Featured {
    featuredGames: Game[];
    projectCount: number;
    authorCount: number;
    projectTypeCount: number;
    gameCount: number;
}

export interface SelectData {
    value: string;
    label: string;
}

export interface AuthorPage {
    projects: Project[];
    user: User;
    projectCount: number;
}

export interface Token {
    id: number;
    name: string;
    createdAt: string;
    lastUsed: string;
}

export interface UploadData {
    filters: SlugName[];
    gameVersions: Version[];
    loaders: SlugName[];
    releaseTypes: SlugName[];
    classifiers: string[];
    dependencyTypes: SlugName[];
}

// export interface Session {
//     user: SessionUser;
//     expires: string;
//     accessToken: string;
// }
//
// export interface SessionUser {
//     name: string;
//     email: string;
//     image: string;
//     id: string;
// }

declare global {
    interface Window {
        adsbygoogle: {}[];
    }
}

export interface GoogleAdProps {
    client?: string;
    slot: string;
    format?: string;
    responsive?: boolean;
    className?: string;
}

export interface SessionWithExtra extends Session {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        id?: string | null;
        role?: string | null;
    };
    accessToken: string;
}

export interface DefinedJWT extends JWT {
    accessToken: string;
    refreshToken: string;
    id: string;
    iat: number;
    exp: number;

    accessTokenExpires: number;
}

export interface Sort {
    game: SlugName[],
    project: SlugName[],
    projectFile: SlugName[]
}