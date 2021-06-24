import { Game } from "interfaces";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function GameCard(props: { game: Game }) {
    return (
        <div>
            <Link href={`/games/${props.game.slug}/${props.game.defaultProjectType}`}>
                <a className={`relative flex flex-col group`}>
                    <Image
                        src={props.game.logoURL.sources[0].src}
                        className={`w-full group-hover:filter group-hover:blur`}
                        alt={props.game.name}
                        width={360}
                        height={180}
                        quality={100}
                        priority={true}
                    />
                    <div className={`hidden group-hover:block bg-hsl-100 bg-opacity-40 absolute top-0 left-0 w-full h-full text-black`}>
                        <div className={`grid w-full h-full`}>
                            <p className={`text-center text-xl m-auto font-bold`}>{props.game.name}</p>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}
