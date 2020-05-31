import React from 'react';
import Layout from '../components/Layout';
import FeaturedProjectCard from "../components/featured/FeaturedProjectCard";
import { get } from '../utils/request';
import { API_URL } from '../utils/api';
import { Featured, Project } from "../interfaces";
import { NextPageContext } from "next";
import FeaturedGameCard from "../components/featured/FeaturedGameCard";

export default function IndexPage({ featured }: { featured: Featured }) {
  return (
    <Layout title="Diluv">
      <>
        <section id={"intro"} className={`text-center mt-4 mb-6 w-full lg:w-5/6 mx-auto`}>
          <div className={`w-5/6 xl:w-auto mx-auto xl:mx-0`}>
            <h1 className={`text-3xl`}>Welcome to Diluv</h1>
            <h3 className={`text-xl`}>Diluv is a hosting platform dedicated to fan-made gaming content. We aim to support players and creators of all
              gaming communities.</h3>
            <h3 className={`text-xl`}>We are currently home to {featured.projectCount} and {featured.contributorCount} authors.</h3>
          </div>
        </section>
        <section id={"promoGames"} className={`w-full lg:w-5/6 mx-auto`}>
          <div className={`xl:flex xl:flex-row justify-between`}>
            <div className={`w-5/6 xl:w-11/12 mx-auto text-center`}>
              <div className={`xl:w-11/12 mr-auto`}>
                <h3 className={`border-b-2 pb-1`}>Popular Games</h3>
                <div className={`flex flex-row flex-wrap -mx-2`}>
                  {featured.games.map(game => <FeaturedGameCard game={game} total={featured.games.length} key={game.slug}/>)}
                </div>
              </div>
            </div>

            <div className={`w-5/6 xl:w-11/12 mt-4 xl:mt-0 mx-auto text-center`}>
              <div className={`xl:w-11/12 ml-auto`}>
                <h3 className={`border-b-2 pb-1`}>New Games</h3>
                <div className={`flex flex-row flex-wrap -mx-2`}>
                  {featured.games.map(game => <FeaturedGameCard game={game} total={featured.games.length} key={game.slug}/>)}
                </div>
              </div>
            </div>
          </div>
        </section>
        {<section id={"promoMods"} className={`w-full lg:w-5/6 mx-auto pt-10`}>
          <div className={`mx-auto`}>
            <div className={``}>
              <h3 className={`text-center border-b-2 pb-1`}>Featured Projects</h3>
              <div className={`lg:flex lg:flex-row lg:flex-wrap -mx-2`}>
                {
                  featured.projects.map((project: Project) =>
                    <FeaturedProjectCard project={project} key={project.id}/>
                  )
                }
              </div>
            </div>
          </div>
        </section>}

        <section id={"diluvAccounts"} className={`w-full lg:w-5/6 mx-auto text-center my-10`}>
          <div className={`w-5/6 xl:w-auto mx-auto xl:mx-0`}>
            <h2 className={`text-2xl pb-4`}>Diluv Accounts</h2>
            <h4 className={`pb-4`}>It looks like you're not logged in! We recommend using a Diluv account to get the best user experience. Creating an
              account is free and provides many benefits!</h4>
            <h4 className={``}>No Download Limits</h4>
            <h4 className={``}>Less Capchas</h4>
            <h4 className={``}>Post Your Own Projects</h4>
            <h4 className={``}>Rate and Review Projects</h4>
          </div>
        </section>
      </>
    </Layout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  let featured = await get(`${API_URL}/v1/featured`);
  return {
    props: { featured: featured.data.data }, // will be passed to the page component as props
  }
}
