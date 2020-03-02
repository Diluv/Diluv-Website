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
      <div className="w-2/3 mx-auto">
        <h2 className="text-center p-4">Project Types</h2>
        <div className="md:flex md:flex-wrap w-5/6 mx-auto">
          {projectTypes.map((type) => (
            <div className={`${projectTypes.length === 1 ? "w-full" : projectTypes.length === 2 ? "md:w-1/2" : "md:w-1/4"} px-1`} key={type.slug}>
              <a href={`/games/${game.slug}/${type.slug}`}>
                <GameCardComponent
                  name={type.name}
                  screenshot={`https://images.placeholders.dev/?width=348&height=225&text=${type.name}`}
                />
              </a>
            </div>
          ))}
        </div>
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
