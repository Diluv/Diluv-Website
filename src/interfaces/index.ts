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
    gameSlug: string;
    maxFileSize: number;
    tags: SlugName[];
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
    logo: string;
    downloads: number;
    createdAt: number;
    updatedAt: number;
    tags: SlugName[];
    game: SlugName;
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

export interface SlugName {
    slug: string;
    name: string;
}

export interface Game extends SlugName {
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

export interface AuthorPage {
    projects: Project[];
    user: User;
    sort: SlugName[];
    projectCount: number;
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
        ga: {};
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
