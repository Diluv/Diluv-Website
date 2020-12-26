import React from "react";
import { Game } from "../../interfaces";
import Link from "next/link";

function FeaturedGameCard({ game }: { game: Game }): JSX.Element {
    return (
        <div className={``}>
            <Link href={`/games/${game.slug}/${game.defaultProjectType}`}>
                <a aria-label={game.name}>
                    <picture>
                        {game.logoURL.sources.map((value) => (
                            <source key={value.src + "-" + value.type} srcSet={value.src} type={value.type} />
                        ))}
                        <source srcSet={game.logoURL.fallback.src} type={game.logoURL.fallback.type} />
                        <img src={game.logoURL.fallback.src} className={`w-full mx-auto`} alt={game.name} />
                    </picture>
                </a>
            </Link>
        </div>
    );
}

export default FeaturedGameCard;
