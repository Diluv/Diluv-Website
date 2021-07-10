import React from "react";
import Layout from "components/Layout";
import { get } from "utils/request";
import { API_URL, SITE_URL } from "utils/api";
import { Featured } from "interfaces";
import { GetStaticProps } from "next";
import Ads from "components/ads/Ads";
import GameCard from "components/misc/GameCard";
import { useSession } from "next-auth/client";
import GridArea from "components/misc/GridArea";
import PromotedHeader from "components/ui/promoted/PromotedHeader";

export default function IndexPage({ featured }: { featured: Featured }): JSX.Element {
    const [session, loading] = useSession();
    return (
        <Layout
            title="Diluv"
            canonical={"/"}
            description={`Diluv is a platform for fan made gaming content such as mods and texture packs. We aim to support the players and content creators of all gaming communities.`}
            image={`${SITE_URL}/static/diluv.png`}
            url={"/"}
        >
            <>
                <section id={"intro"} className={`w-5/6 mx-auto text-center my-4 flex flex-col gap-y-2`}>
                    <h1 className={`text-3xl`}>Welcome to Diluv</h1>
                    <h2 className={`text-xl`}>
                        Diluv is a platform for fan made gaming content such as mods and texture packs. We aim to support the players and content
                        creators of all gaming communities. We are currently home to {featured.projectCount} projects and {featured.authorCount}{" "}
                        authors!
                    </h2>
                </section>
                <section id={"promoGames"} className={`w-5/6 mx-auto promotedGames text-center`}>
                    <GridArea name={"title1"}>
                        <PromotedHeader>Popular Games</PromotedHeader>
                    </GridArea>
                    <GridArea name={"title2"}>
                        <PromotedHeader className={`mt-4 xl:mt-0`}>New Games</PromotedHeader>
                    </GridArea>
                    <GridArea name={`cards1`} className={`promotedGamesCards`}>
                        {featured.featuredGames.map((game) => (
                            <GameCard game={game} key={game.slug} />
                        ))}
                    </GridArea>
                    <GridArea name={`cards2`} className={`promotedGamesCards`}>
                        {featured.featuredGames.map((game) => (
                            <GameCard game={game} key={game.slug} />
                        ))}
                    </GridArea>
                </section>

                <section id={"about"} className={`w-5/6 mx-auto text-center mt-4 mb-10`}>
                    <h2 className={`border-b-2 dark:border-dark-700 pb-1 text-3xl`}>Join the community</h2>
                    <h3 className={`text-xl my-2`}>
                        Are you a creator of gaming related content? Consider joining the Diluv community and share your project today! We currently
                        support {featured.gameCount} games and {featured.projectTypeCount} project types.
                    </h3>
                    <h4 className={`text-lg`}>
                        Diluv was built by experienced content creators who wanted better for their content and communities. Our mission is to provide
                        a reliable platform that empowers content creators of all sizes.
                    </h4>
                </section>
                {/*Temp*/}
                <Ads />
            </>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const featured = await get(`${API_URL}/v1/site`);
    return {
        props: { featured: featured.data },
        revalidate: 60
    };
};
