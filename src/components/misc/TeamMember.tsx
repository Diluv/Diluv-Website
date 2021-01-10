import React from "react";
import { CDN_URL } from "../../utils/api";

type Props = {
    readonly name: string;
    readonly username: string;
    readonly twitter: string;
    readonly github: string;
    readonly description: string;
}

export default function TeamMember({ name, username, twitter, github, description }: Props): JSX.Element {
    return (
        <div>
            <picture>
                <source type="image/avif" src={`${CDN_URL}/users/${username}/avatar.avif`}/>
                <source type="image/webp" src={`${CDN_URL}/users/${username}/avatar.webp`}/>
                <img src={`${CDN_URL}/users/${username}/avatar.png`} className={`w-full`}/>
            </picture>
            <div className="flex flex-col justify-center mt-2">
                <p className="text-lg font-bold">{name}</p>
                <p className="text-sm tracking-wide text-gray-800 dark:text-dark-200">
                    {description}
                </p>
            </div>
        </div>
    );
}