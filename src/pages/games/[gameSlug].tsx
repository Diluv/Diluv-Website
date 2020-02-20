import React from 'react';

import { NextPageContext } from 'next';
import Layout from '../../components/Layout';
import { getGamesBySlug } from '../../utils/games';
import { Game, ProjectType } from '../../interfaces';
import { getProjectTypesByGameSlug } from '../../utils/projects';
import GameCardComponent from '../../components/GameCardComponent';

type Props = {
  game: Game
  projectTypes: ProjectType[]
  errors?: string
};

function GamePage({ game, projectTypes, errors }: Props) {
  return (
    <Layout title="Diluv">
      <div className="container mx-auto">
        {(projectTypes.length > 0 && (
          <>
            <h2 className="text-center">Project Types</h2>
            <div className="row pt-md-5">
              {projectTypes.map((type) => (
                <div className="col-md-4 mx-auto" key={type.slug}>
                  <a href={`/games/${game.slug}/${type.slug}`}>
                    <GameCardComponent
                      name={type.name}
                      screenshot={`https://via.placeholder.com/348x225.png?text=${type.name}`}
                    />
                  </a>
                </div>
              ))}
            </div>
          </>
        ))}
        {errors}
      </div>
    </Layout>
  );
}

GamePage.getInitialProps = async ({ query: { gameSlug } }: NextPageContext) => {
  const game = await getGamesBySlug(gameSlug);
  const projectTypes = await getProjectTypesByGameSlug(gameSlug);
  return { game, projectTypes };
};

export default GamePage;
