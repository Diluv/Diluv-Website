import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { Project } from "../../../../../interfaces";
import { listContributors } from "../../../../../utils/util";
import { DisplayTag, FilterTag } from "../../../../../components/misc/FilterTag";
import ReactMarkdown from "react-markdown";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import ChartBar from "../../../../../components/icons/ChartBar";
import moment from "moment";
import HourGlass from "../../../../../components/icons/HourGlass";
import Time from "../../../../../components/icons/Time";

export default function ProjectIndex({ project }: { project: Project }) {

    return (
        <Layout title={project.name}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <div id={"topInfo"}>
                        <div className={`grid my-4 gap-4`} style={{ gridTemplateColumns: "12rem 1fr" }}>
                            <img src={project.logo} className={`h-48 w-48`}/>
                            <div className={`grid grid-rows-3-auto`}>
                                <div className={`leading-tight`}>
                                    <h4 className={`font-semibold`}>{project.name}</h4>
                                    <div className={`text-gray-700 mb-1`}>
                                        <span>
                                            {`by `}
                                        </span>
                                        {listContributors(project)}
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Project Id
                                    </p>
                                    <p>
                                        Created on
                                    </p>
                                    <p>
                                        updated on
                                    </p>
                                    <p>
                                        Downloads
                                    </p>
                                </div>
                                <div className={`grid my-auto gap-2`} style={{ gridTemplateColumns: "auto auto auto auto 1fr" }}>
                                    {project.tags.map(value => <DisplayTag tagName={value.name} tagSlug={value.slug}/>)}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div id={"pageContent"} className={`my-4`}>
                        <div className={`grid border-b border-gray-500`} style={{ gridTemplateColumns: "auto auto auto auto 1fr" }}>
                            <div className={`p-2 border-l border-t border-r border-b border-gray-500`} style={{
                                marginBottom: "-1px",
                                borderBottomColor: "white"
                            }}>
                                <p>Description</p>
                            </div>
                            <div className={`p-2 border-t border-r border-gray-500`}>
                                <p>Files</p>
                            </div>
                            <div className={`p-2 border-t border-r border-gray-500`}>
                                <p>Members</p>
                            </div>

                        </div>
                        <div className={`border-l border-r border-b border-gray-500 p-4`}>
                            <ReactMarkdown source={`Bookshelf is a library mod which adds a lot of reusable code. The goal of bookshelf is to make writing complex mods much easier, while also expanding the capabilities of various systems within Minecraft and Forge. Bookshelf is used by many large mods and makes them easier to update and maintain. 

**Notice:** Alpha and Beta releases may contain breaking changes or world corrupting bugs. Please stick to Release versions unless you know what you're doing or working with someone else who does.

## Features
- Lazy loaded registry for Vanilla and Forge registry entries.
- Massive collection of utility functions.
- Extensive additions to the Data Pack specification.
- Weighted registries.
- Markdown table generators.

[![Nodecraft](https://nodecraft.com/assets/images/logo-dark.png)](https://nodecraft.com/r/darkhax)
This project is sponsored by Nodecraft! Use code Darkhax for 30% off your first month of service!

## Data Pack Documentation
- [Recipe Types](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#recipe-types)
  - [Shaped Damage Recipe](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#shaped-damage-recipe)
  - [Shapeless Damage Recipe](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#shapeless-damage-recipe)
- [Ingredients](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#ingredients)
  - [Mod ID](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#mod-id)
  - [Any Hoe](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#any-hoe)
  - [Any Pickaxe](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#any-pickaxe)
  - [Any Axe](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#any-axe)
  - [Any Shovel](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#any-shovel)
  - [Any Sword](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#any-sword)
- [Loot Conditions](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#loot-conditions)
  - [In Biome Tag](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#check-biome-tag)
  - [In Dimension](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#check-dimension)
  - [In Village](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#check-for-village)
  - [Active Raid](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#check-for-raid)
  - [In Slime Chunk](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#check-for-slime-chunk)
  - [Redstone Power](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#check-redstone-power)
- [Loot Modifiers](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#global-loot-modifiers)
  - [Clear Loot](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#clear-items)
  - [Apply Silk Touch](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#apply-silk-touch)
  - [Convert Table](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#convert-to-different-table)
- [Item Predicate](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#item-predicates)
  - [Mod ID](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#mod-id-predicate)
  - [Ingredient](https://github.com/Darkhax-Minecraft/Bookshelf/wiki/Data-Packs#ingredient-predicate)`}/>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}


export async function getServerSideProps(context: NextPageContext) {
    let { GameSlug, ProjectType, ProjectSlug } = context.query;

    let data = await get(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`);
    return {
        props: { project: data.data } // will be passed to the page component as props
    };
}