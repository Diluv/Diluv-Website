import { Game } from "../../interfaces";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function GameCard(props: { game: Game }) {
    return (
        <div className={``}>
            <Link href={`/games/${props.game.slug}/${props.game.defaultProjectType}`}>
                <a>
                    <div className={`flex flex-col`}>
                        <Image
                            src={props.game.logoURL.sources[0].src}
                            className={`w-full`}
                            alt={props.game.name}
                            width={360}
                            height={180}
                            quality={100}
                        />
                        <div className={`h-16 hover:h-32 hover:break-normal`}>
                            <p className={`text-center bg-gray-300 dark:bg-dark-800 px-1 py-2 text-lg`}>{props.game.name}</p>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
}
