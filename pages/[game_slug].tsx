import * as React from 'react'
import Layout from '../components/Layout'
import {NextPage} from 'next'
import {getGamesBySlug} from "../utils/games";
import {Game, ProjectType} from "../interfaces";
import {getProjectTypesByGameSlug} from "../utils/projects";

type Props = {
  games?: Game
  projectTypes?: ProjectType[]
  errors?: string
}

const GamePage: NextPage<Props> = ({games, projectTypes, errors}) => (
  <Layout title="Diluv">
    <div className="container pt-md-5">
      {games && games.slug}
      {(projectTypes && projectTypes.length > 0 && (
        <React.Fragment>
          <h2 className="text-center pt-md-5">Game Types</h2>
          <div className="row pt-md-5">
            {projectTypes.map((value) =>
              <div className="col-md-4 mx-auto" key={value.slug}>
                {value.name}
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
  try {
    if (typeof game_slug == "string") {
      const games = await getGamesBySlug(game_slug);
      const projectTypes = await getProjectTypesByGameSlug(game_slug);
      return {games, projectTypes};
    }
    return {errors: 'Invalid slug'}
  } catch (err) {
    return {errors: err.message}
  }
};

export default GamePage
