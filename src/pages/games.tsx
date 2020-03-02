import React from 'react';
import Layout from '../components/Layout';
import GameCardComponent from '../components/GameCardComponent';
import { getGames } from '../utils/games';
import { Game } from '../interfaces';

type Props = {
  games: Game[]
  errors: string
};

function GamesPage({ games }: Props) {
  return (
    <Layout title="Games | Diluv">
      <div className="w-2/3 mx-auto">
        <h2 className="text-center p-4">Games</h2>
        <div className="md:flex md:flex-wrap w-5/6 mx-auto">
          {games.map((game) => (
            <div className={`${games.length === 1 ? "w-full" : games.length === 2 ? "md:w-1/2" : "md:w-1/4"} px-1`} key={game.slug}>
              <a href={`/games/${game.slug}`}>
                <GameCardComponent
                  name={game.name}
                  screenshot={`${game.image}`}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

GamesPage.getInitialProps = async () => {
  try {
    const games = await getGames();
    return { games };
  } catch (err) {
    return { errors: err.message };
  }
};

export default GamesPage;
