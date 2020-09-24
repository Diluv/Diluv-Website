import Layout from "../components/Layout";
import React from "react";
import { SITE_URL } from "../utils/api";

import TeamMember from "../components/misc/TeamMember";

export default function Feedback(): JSX.Element {
    return (
        <Layout
            title="About Us"
            canonical={`${SITE_URL}/about`}
            description={`About | Diluv`}
            image={`${SITE_URL}/static/diluv.png`}
            url={`/about`}
        >
            <p className="w-6/12 text-center mx-auto my-8">Diluv is a hosting platform for fan made gaming content such as mods and texture packs.
                Diluv was founded by content creators who wanted an open and reliable platform for this type of content. Our mission is to empower
                content creators and their communities with powerful tools and open access to data.</p>

            <div className="px-4 container w-11/12 mx-auto my-4 md:px-24 lg:px-8 mb-16">
                <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-lg">
                    <TeamMember name="Darkhax" avatar="https://i.imgur.com/dEAn657" description="I'm a self-taught software engineer and have over 10 years of experience with developing mods. My main modding obsession has been Minecraft however I also publish mods for Stardew Valley, Subnautica, and other indie games." twitter="DarkhaxDev" github="Darkhax" />
                    <TeamMember name="Jared" avatar="https://imgur.com/mdevWDk" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." twitter="jaredlll08" github="jaredlll08" />
                    <TeamMember name="LCLC98" avatar="https://imgur.com/wvWfT5Z" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." twitter="lclc98" github="lclc98" />
                </div>
            </div>
        </Layout>
    );
}
