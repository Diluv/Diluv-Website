import * as React from 'react'
import Layout from '../components/Layout'
import GameCardComponent from '../components/GameCardComponent'
import {NextPage} from 'next'
import {getGames} from "../utils/games";
import {Game, Project} from "../interfaces";
import ModCard from "../components/ModCard";

type Props = {
  games?: Game[]
  projects?: Project[]
  errors?: string
}


// TODO add back error, this shouldn't happen but could mean the API is down.
const IndexPage: NextPage<Props> = ({games, projects/*, errors*/}) => (
  <Layout title="Diluv">
    <div className="text-center">
      <p>
        Hi Diluv is a project.
      </p>
    </div>
    <div className="container pt-md-5">
      {(games && games.length > 0 && (
        <React.Fragment>
          <h2 className="text-center pt-md-5">Games Mods</h2>
          <div className="row pt-md-5">
            {games.map((game) =>
              <div className="col-md-4 mx-auto" key={game.slug}>
                <a href={`/games/${game.slug}`}>
                  <GameCardComponent name={game.name} screenshot={"https://via.placeholder.com/348x225.png?text=" + game.name}/>
                </a>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}

      <h2 className="text-center pt-md-5">Featured Games</h2>
      <div className="row pt-md-5">
        {[...Array(3)].map((_, i) =>
          <div className="col-md-4" key={'featured_game_' + i}>
            <GameCardComponent name={"Featured Games"} screenshot={"https://via.placeholder.com/348x225.png"}/>
          </div>
        )}
      </div>

      {(projects && projects.length > 0 && (
        <React.Fragment>
          <h2 className="text-center pt-md-5">Featured Mods</h2>
          <div className="row pt-md-5">
            {projects.map((_, i) =>
              <div className="col-md-4" key={'featured_mods_' + i}>
                <ModCard name={"Featured Mods"} screenshot={"https://via.placeholder.com/348x225.png"}/>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  </Layout>
);

IndexPage.getInitialProps = async ({}) => {
  try {
    const games = await getGames();
    // const projects = await getProjects();
    return {games, projects: []}
  } catch (err) {
    return {errors: err.message}
  }
};

export default IndexPage
