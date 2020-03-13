import React from 'react';
import Layout from '../components/Layout';
import GameCardComponent from '../components/GameCardComponent';
import { getFeaturedGames, getGames } from '../utils/games';
import { Game, Project } from '../interfaces';
import ModCard from '../components/ModCard';
import { getFeaturedProjects, getProjectsByGameSlugAndProjectTypeSlug } from "../utils/projects";

type Props = {
  games: Game[]
  projects: Project[]
  errors: string
};

// TODO add back error, this shouldn't happen but could mean the API is down.
function IndexPage({ games, projects, errors }: Props) {
  return (
    <Layout title="Diluv">
      <div className="text-center">
        {errors}
        <h2>Welcome to Diluv</h2>
        <p>
          Diluv is a platform for game fans to share their fan made content with the world.
        </p>
        <p>
          We are currently home to {5} projects and {5} authors.
        </p>
      </div>


      <div className={"py-2 md:mt-5"}>
        <div className="md:flex w-5/6 mx-auto">
          <div className={"md:w-1/2 mx-auto"}>
            <h2 className="text-center ">Popular Games</h2>
            <div className="md:flex md:flex-wrap w-3/6 pt-2 mx-auto">
              {games.map((game) => (
                <div className={`${games.length === 1 ? "md:w-full" : "md:w-1/" + Math.min(games.length, 3)} px-1`} key={game.slug}>
                  <a href={`/games/${game.slug}`}>
                    <GameCardComponent
                      name={game.name}
                      screenshot={`https://images.placeholders.dev/?width=250&height=131&text=${game.name}`}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <>
        <h2 className="text-center">Featured Mods</h2>
        <div className={"md:w-1/2 mx-auto pt-2"}>
          <div className="flex flex-wrap w-5/6 mx-auto">
            {projects.map((project) => (
              <div className="w-1/2 px-2 mb-3" key={project.name}>
                <ModCard name={project.name} contributors={project.contributors} summary={project.summary} screenshot={project.logo}/>
              </div>
            ))}
          </div>
        </div>
      </>

      {
        // Don't show if logged in
        true && (
          <div className="">
            <div className="text-center">
              <h2>Diluv Account</h2>
              <div className="row">
                <div className="col-4 mx-auto">
                  <div className="text-center">
                    It looks like you're not logged in! We recommend using Diluv account to get the best user experience.
                    Creating an account is free
                    and provides many great benefits!
                  </div>
                </div>
              </div>
              <p>TODO</p>
            </div>
          </div>
        )
      }
    </Layout>
  );
}

IndexPage.getInitialProps = async () => {
  try {
    const games = await getFeaturedGames();
    const projects = await getFeaturedProjects();
    return { games, projects };
  } catch (err) {
    return { errors: err.message };
  }
};

export default IndexPage;
