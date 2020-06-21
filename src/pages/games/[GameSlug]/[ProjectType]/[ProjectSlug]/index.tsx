import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { get } from "../../../../../utils/request";
import { API_URL } from "../../../../../utils/api";
import { HasTheme, Project } from "../../../../../interfaces";
import ProjectInfo from "../../../../../components/project/ProjectInfo";
import { getTheme } from "../../../../../utils/theme";
import Markdown from "../../../../../components/Markdown";

export default function ProjectIndex({ theme, project }: { project: Project } & HasTheme) {

    return (
        <Layout title={project.name} theme={theme}>
            <>
                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <ProjectInfo project={project} pageType={"description"}/>
                    <div id={"pageContent"}>
                        <div className={`py-4 px-2`}>
                            <Markdown markdown={`Bookshelf is a library mod which adds a lot of reusable code. The goal of bookshelf is to make writing complex mods much easier, while also expanding the capabilities of various systems within Minecraft and Forge. Bookshelf is used by many large mods and makes them easier to update and maintain. 

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
    let theme = getTheme(context);
    let { GameSlug, ProjectType, ProjectSlug } = context.query;

    let data = await get(`${API_URL}/v1/site/projects/${GameSlug}/${ProjectType}/${ProjectSlug}`);
    return {
        props: { theme, project: data.data } // will be passed to the page component as props
    };
}