import * as React from 'react'
import Layout from '../components/Layout'
import {NextPage} from 'next';
import GameCardComponent from "../components/GameCardComponent";
import {getGames} from "../utils/games";
import {Game} from "../interfaces";

type Props = {
  games?: Game[]
  errors?: string
}

const GamesPage: NextPage<Props> = ({games}) => (
  <Layout title="Games | Diluv">
    <div className="container pt-md-5">
      {(games && games.length > 0 && (
        <React.Fragment>
          <h2 className="text-center">Games</h2>
          <div className="row pt-md-5">
            {games.map((game) =>
              <div className="col-md-4 mx-auto" key={game.slug}>
                <a href={`/games/${game.slug}`}>
                  <GameCardComponent name={game.name}
                                     screenshot={"https://via.placeholder.com/348x225.png?text=" + game.name}/>
                </a>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  </Layout>
);

GamesPage.getInitialProps = async ({}) => {
  try {
    const games = await getGames();
    return {games}
  } catch (err) {
    return {errors: err.message}
  }
};

export default GamesPage
