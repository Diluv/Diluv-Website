import React from "react";
import { Game } from "../../interfaces";
import Link from "next/link";

function FeaturedGameCard({ game, total }: { game: Game, total: number }) {
    return <div className={`w-1/2 lg:w-${total === 1 ? `full` : `1/` + total} p-2 mx-auto`}>
        <Link href={`/games/[GameSlug]/[ProjectType]`} as={`/games/${game.slug}/${game.defaultProjectType}`}>

            <a>

                <picture>
                    {game.logoURL.sources.map(value => <source key={value.src + "-" + value.type} srcSet={value.src} type={value.type}/>)}
                    <source srcSet={game.logoURL.fallback.src} type={game.logoURL.fallback.type}/>
                    <img src={game.logoURL.fallback.src} className={`w-full mx-auto`}/>
                </picture>
            </a>

        </Link>
    </div>;
}

export default FeaturedGameCard;