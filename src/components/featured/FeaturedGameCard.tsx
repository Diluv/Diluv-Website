import React from 'react';
import { Games } from "../../interfaces";

function FeaturedGameCard(props: { game: Games }) {
  return <>
    <div className={`w-1/2 lg:w-1/3 p-2 mx-auto`}>
      <img src={props.game.logoURL} className={`mx-auto h-28`}/>
    </div>
  </>
}

export default FeaturedGameCard;