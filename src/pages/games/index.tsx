import React, { ChangeEvent, useState } from "react";
import Layout from "components/Layout";
import Search from "components/icons/Search";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getAuthed } from "../../utils/request";
import { API_URL, getSession, SITE_URL } from "../../utils/api";
import { Game, SlugName } from "../../interfaces";
import { useRouter } from "next/router";
import { reactSelectStyle } from "../../utils/theme";
import Select from "react-select";
import { onBlur, onFocus } from "../../utils/util";
import { DebounceInput } from "react-debounce-input";
import GridArea from "../../components/misc/GridArea";
import GameCard from "../../components/misc/GameCard";

function buildURL(search: string, sort: string) {
    const params = new URLSearchParams();

    if (search) {
        params.set("search", search);
    }
    if (sort !== "name") {
        params.set("sort", sort);
    }
    params.sort();
    if (params.toString().length) {
        return `?${params.toString()}`;
    }
    return ``;
}

export default function GameIndex({
    games,
    sorts,
    currentSort,
    search
}: {
    games: Game[];
    sorts: SlugName[];
    currentSort: string;
    search: string;
}): JSX.Element {
    const [selectedField, setSelectedField] = useState("");
    // Fix for < 3 search killing things
    const [displaySearch] = useState(search);
    const router = useRouter();

    function getSortFromCurrent(): SlugName {
        for (const sort of sorts) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return sorts[0];
    }

    return (
        <Layout title="Games" canonical={`/games`} description={`Games on Diluv`} image={`${SITE_URL}/static/diluv.png`} url={`/games`}>
            <>
                <div id={"header"} className={`text-center my-4 w-full lg:w-5/6 mx-auto`}>
                    <h1 className={`text-3xl`}>Games</h1>
                </div>

                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <div className={`grid justify-between gameFilterSmall sm:gameFilterMedium gap-y-2 sm:gap-y-0`} id={`filter options`}>
                        <GridArea name={`search`} className={`flex flex-grow`}>
                            <label htmlFor={`searchGames`} className={`flex-none my-auto mr-2`}>
                                Search
                            </label>
                            <div className={"relative my-auto flex-grow ml-1"}>
                                <Search
                                    className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${
                                        search.trim().length ? `text-diluv-500` : ``
                                    } ${selectedField === "searchGames" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`}
                                    width={"1rem"}
                                    height={"1rem"}
                                />
                                <DebounceInput
                                    className={
                                        "p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 flex-grow indent-sm dark:border-dark-700 dark-hover:border-dark-600 dark-focus:border-dark-600 dark:bg-dark-800 outline-none w-full sm:w-auto"
                                    }
                                    minLength={3}
                                    debounceTimeout={500}
                                    value={displaySearch}
                                    placeholder={"Search games"}
                                    id={"searchProjects"}
                                    onFocus={(event: React.FocusEvent<any>) => onFocus(setSelectedField, event)}
                                    onBlur={() => onBlur(setSelectedField)}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        const newUrl = buildURL(event.target.value, currentSort);
                                        router.push(`/games${newUrl}`);
                                    }}
                                />
                            </div>
                        </GridArea>
                        <GridArea name={`sort`} className={`flex`}>
                            <label htmlFor={`sortGames`} className={`flex-none ml-auto my-auto mr-2`}>
                                Sort
                            </label>
                            <div className={"my-auto flex-grow ml-1"}>
                                <Select
                                    isSearchable={true}
                                    inputId="sortGames"
                                    defaultValue={{ value: getSortFromCurrent().slug, label: getSortFromCurrent().name }}
                                    options={sorts.map((value) => {
                                        return { value: value.slug, label: value.name };
                                    })}
                                    styles={reactSelectStyle}
                                    onChange={(e: any) => {
                                        const newUrl = buildURL(search, e.value);
                                        router.push(`/games${newUrl}`);
                                    }}
                                    classNamePrefix={"select"}
                                />
                            </div>
                        </GridArea>
                    </div>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4`} id={`gameContainer`}>
                        {games.map((game: Game) => {
                            return (
                                <GameCard key={game.slug} game={game} />
                            );
                        })}
                    </div>
                </div>
            </>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { sort = "", search = "" } = context.query;

    const params = new URLSearchParams();
    if (sort) {
        params.set("sort", `${sort}`);
    }
    if (search && search.length) {
        params.set("search", `${search}`);
    }

    const session = await getSession(context);

    const games = await getAuthed(`${API_URL}/v1/site/games${params.toString() ? `?${params.toString()}` : ``}`, { session });

    return {
        props: {
            games: games.data.games,
            sorts: games.data.sort,
            currentSort: sort.length ? sort : `name`,
            search: search ?? ``,
            session: session
        } // will be passed to the page component as props
    };
};
