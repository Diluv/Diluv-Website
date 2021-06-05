import Layout from "../components/Layout";
import React from "react";
import { SITE_URL } from "../utils/api";

import TeamMember from "../components/misc/TeamMember";

export default function Feedback(): JSX.Element {
    return (
        <Layout title="About Us" canonical={`${SITE_URL}/about`} description={`About | Diluv`} image={`${SITE_URL}/static/diluv.png`} url={`/about`}>
            <div className={`w-5/6 text-center mx-auto`}>
                <h1 className={`my-4`}>About us</h1>
                <p>Diluv is a hosting platform for fan made gaming content such as mods and texture packs.</p>
                <p>Diluv was founded by content creators who wanted an open and reliable platform for this type of content.</p>
                <p>Our mission is to empower content creators and their communities with powerful tools and open access to data.</p>

                <h1 className={`mt-8`}>The team</h1>
                <div className="px-4 container w-11/12 mx-auto my-4 md:px-24 lg:px-8 mb-16">
                    <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-lg">
                        <TeamMember
                            name="Darkhax"
                            username={"darkhax"}
                            description="I'm a self-taught software engineer and have over 10 years of experience with developing mods. My main modding obsession has been Minecraft however I also publish mods for Stardew Valley, Subnautica, and other indie games."
                            twitter="DarkhaxDev"
                            github="Darkhax"
                        />
                        <TeamMember
                            name="Jared"
                            username={"jaredlll08"}
                            description="I'm an Open Source developer focusing on web development and Minecraft mods. I made most of this website!"
                            twitter="jaredlll08"
                            github="jaredlll08"
                        />
                        <TeamMember
                            name="LCLC98"
                            username={"lclc98"}
                            description="I have been programming for 8 years and started with developing Minecraft mods. I have worked on a lot of different types of software."
                            twitter="lclc98"
                            github="lclc98"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
