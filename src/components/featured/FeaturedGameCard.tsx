import React from 'react';
import { Games } from "../../interfaces";

function FeaturedGameCard(props: { game: Games, total: number }) {
  return <>
    <div className={`w-1/2 lg:w-${props.total === 1 ? `full` : `1/` + props.total} p-2`}>
      <img src={props.game.logoURL} className={`w-full mx-auto`}/>
    </div>
  </>
}

export default FeaturedGameCard;