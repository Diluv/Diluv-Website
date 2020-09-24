import React from "react";

type Props = {
    readonly name: string;
    readonly avatar: string;
    readonly twitter: string;
    readonly github: string;
    readonly description: string;
}

export default function TeamMember({ name, avatar, twitter, github, description }: Props): JSX.Element {
    return (
        <div >
            <picture>
                <source type="image/webp" src={avatar + ".webp"} />
                <source type="image/png" src={avatar + ".png"} />
                <img src={avatar + ".png"}  className={`w-full`} />
            </picture>
            <div className="flex flex-col justify-center">
                <p className="text-lg font-bold">{name}</p>
                {/*<p className="mb-2 text-xs text-gray-800">role?</p>*/}
                <p className="text-sm tracking-wide text-gray-800">
                    {description}
                </p>
            </div>
        </div>
    );
}