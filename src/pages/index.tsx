import React from "react";
import Layout from "../components/Layout";
import { get } from "../utils/request";
import { API_URL } from "../utils/api";
import { Featured, HasTheme } from "../interfaces";
import { NextPageContext } from "next";
import FeaturedGameCard from "../components/featured/FeaturedGameCard";
import { getTheme } from "../utils/theme";

export default function IndexPage({ theme, featured }: { featured: Featured } & HasTheme) {
    return (
        <Layout title="Diluv" theme={theme}>
            <>
                <section id={"intro"} className={`w-5/6 mx-auto text-center my-4`}>
                    <h1 className={`text-3xl`}>Welcome to Diluv</h1>
                    <h3 className={`text-xl`}>Diluv is a platform for fan made gaming content such as mods and texture packs. We aim to
                        support
                        the players and content creators of all gaming communities. We are currently home to {featured.projectCount} projects
                        and {featured.contributorCount} authors!
                    </h3>
                </section>
                <section id={"promoGames"} className={`w-full lg:w-5/6 mx-auto`}>
                    <div className={`xl:flex xl:flex-row justify-between`}>
                        <div className={`w-5/6 xl:w-11/12 mx-auto text-center`}>
                            <div className={`xl:w-11/12 mr-auto`}>
                                <h3 className={`border-b-2 dark:border-dark-700 pb-1 font-medium text-xl`}>Popular Games</h3>
                                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4`}>
                                    {featured.featuredGames.map(game => <FeaturedGameCard game={game} key={game.slug}/>)}
                                </div>
                            </div>
                        </div>

                        <div className={`w-5/6 xl:w-11/12 mt-4 xl:mt-0 mx-auto text-center`}>
                            <div className={`xl:w-11/12 ml-auto`}>
                                <h3 className={`border-b-2 dark:border-dark-700 pb-1 font-medium text-xl`}>New Games</h3>
                                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4`}>
                                    {featured.featuredGames.map(game => <FeaturedGameCard game={game} key={game.slug}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id={"about"} className={`w-5/6 mx-auto text-center mt-4 mb-10`}>
                    <h1 className={`border-b-2 dark:border-dark-700 pb-1 text-3xl`}>Join the community</h1>
                    <h3 className={`text-xl my-2`}>
                        Are you a creator of gaming related content? Consider joining the Diluv community and share your project today! We
                        currently
                        support {featured.gameCount} games and {featured.projectTypeCount} project types.
                    </h3>
                    <h4 className={`text-lg`}>
                        Diluv was built by experienced content creators who wanted better for their content and communities. Our mission is to
                        provide
                        a reliable platform that empowers content creators of all sizes.
                    </h4>
                </section>
            </>
        </Layout>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    let featured = await get(`${API_URL}/v1/site`);
    let theme = getTheme(context);
    return {
        props: { theme, featured: featured.data } // will be passed to the page component as props
    };
}
