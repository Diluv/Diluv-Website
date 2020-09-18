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

        <div className="flex flex-wrap mb-6">

            <div className="w-1/12">
                <picture>
                    <source type="image/webp" src={avatar + ".webp"} />
                    <source type="image/png" src={avatar + ".png"} />
                    <img src={avatar + ".png"} />
                </picture>
            </div>

            <div className="w-3/4 mx-4">
                <h2 className="mb-1">{name}</h2>
                <p className="team-member-desc">{description}</p>
            </div>
        </div>

    );
}