import React from 'react';
import { Game } from "../../interfaces";
import Link from "next/link";

function FeaturedGameCard({ game, total }: { game: Game, total: number }) {
  return <div className={`w-1/2 lg:w-${total === 1 ? `full` : `1/` + total} p-2 mx-auto`}>
    <Link href={`/games/[gameSlug]/`} as={`/games/${game.slug}/`}>

      <a>

        <img src={game.logoURL} className={`w-full mx-auto`}/>

      </a>

    </Link>
  </div>
}

export default FeaturedGameCard;