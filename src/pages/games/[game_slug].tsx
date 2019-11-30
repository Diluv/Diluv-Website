import * as React from 'react'
import Layout from '../../components/Layout'
import {NextPage} from 'next'
import {getGamesBySlug} from "../../utils/games";
import {Game, ProjectType} from "../../interfaces";
import {getProjectTypesByGameSlug} from "../../utils/projects";
import GameCardComponent from "../../components/GameCardComponent";

type Props = {
  game: Game
  projectTypes: ProjectType[]
  errors?: string
}

const GamePage: NextPage<Props> = ({game, projectTypes, errors}) => (
  <Layout title="Diluv">
    <div className="container pt-md-5">
      {(projectTypes.length > 0 && (
        <React.Fragment>
          <h2 className="text-center pt-md-5">Game Types</h2>
          <div className="row pt-md-5">
            {projectTypes.map((type) =>
              <div className="col-md-4 mx-auto" key={type.slug}>
                <a href={`/games/${game.slug}/${type.slug}`}>
                  <GameCardComponent name={type.name} screenshot={"https://via.placeholder.com/348x225.png?text=" + type.name}/>
                </a>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
      {errors}
    </div>
  </Layout>
);

GamePage.getInitialProps = async ({query: {game_slug}}) => {
  const gameSlug = Array.isArray(game_slug) ? game_slug[0] : game_slug;
  const game = await getGamesBySlug(gameSlug);
  const projectTypes = await getProjectTypesByGameSlug(gameSlug);
  return {game, projectTypes};
};

export default GamePage
