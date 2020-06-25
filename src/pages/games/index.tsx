import React, { ChangeEvent, FocusEvent, useState } from "react";
import Layout from "components/Layout";
import Search from "components/icons/Search";
import { NextPageContext } from "next";
import { get } from "../../utils/request";
import { API_URL } from "../../utils/api";
import { Game, HasTheme, Sort } from "../../interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import { getTheme, reactSelectStyle } from "../../utils/theme";
import Select from "react-select";
import { onBlur, onFocus } from "../../utils/util";
import { DebounceInput } from "react-debounce-input";

function buildURL(search: string, sort: string) {
    let params = new URLSearchParams();

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

export default function GameIndex({ theme, games, sorts, currentSort, search }: { games: Game[], sorts: Sort[], currentSort: string, search: string } & HasTheme) {
    const [selectedField, setSelectedField] = useState("");
    // Fix for < 3 search killing things
    let [displaySearch] = useState(search);
    const router = useRouter();

    function getSortFromCurrent(): Sort {
        for (let sort of sorts) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return sorts[0];
    }

    return (
        <Layout title="Games" theme={theme}>
            <>
                <div id={"header"} className={`text-center my-4 w-full lg:w-5/6 mx-auto`}>
                    <h1 className={`text-3xl`}>Games</h1>
                </div>

                <div className={`mx-auto w-5/6 md:w-4/6`}>
                    <div className={`grid justify-between gameFilterSmall sm:gameFilterMedium row-gap-2 sm:row-gap-0`} id={`filter options`}>
                        <div className={`flex flex-grow area-search`}>
                            <label htmlFor={`searchGames`} className={`flex-none my-auto`}>
                                Search
                            </label>
                            <div className={"relative my-auto flex-grow ml-1"}>
                                <Search className={`ml-2 my-2 fill-current absolute svg-icon pointer-events-none transition-opacity duration-300 ${search.trim().length ? `text-diluv-500` : `text-black`} ${selectedField === "searchGames" ? "opacity-0 ease-out" : "opacity-100 ease-in"}`} width={"1rem"} height={"1rem"}/>
                                <DebounceInput
                                    className={"p-1 border border-gray-400 hover:border-gray-500 focus:border-gray-500 flex-grow indent-sm dark:border-dark-700 dark-hover:border-dark-600 dark-focus:border-dark-600 dark:bg-dark-800 outline-none w-full sm:w-auto"}
                                    minLength={3}
                                    debounceTimeout={500}
                                    value={displaySearch}
                                    placeholder={"Search games"} id={"searchProjects"}
                                    onFocus={(event: React.FocusEvent<any>) => onFocus(setSelectedField, event)} onBlur={() => onBlur(setSelectedField)} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    let newUrl = buildURL(event.target.value, currentSort);
                                    router.push(`/games`, `/games${newUrl}`, { shallow: false });
                                }}/>
                            </div>

                        </div>
                        <div className={`flex area-sort`}>
                            <label htmlFor={`sortGames`} className={`flex-none ml-auto my-auto`}>
                                Sort:
                            </label>
                            <div className={"my-auto flex-grow ml-1"}>
                                <Select isSearchable={true} inputId="sortGames"
                                        defaultValue={{ value: getSortFromCurrent().slug, label: getSortFromCurrent().displayName }}
                                        options={sorts.map(value => {
                                            return { value: value.slug, label: value.displayName };
                                        })}
                                        styles={reactSelectStyle} onChange={(e: any) => {
                                    let newUrl = buildURL(search, e.value);
                                    router.push(`/games`, `/games${newUrl}`, { shallow: false });
                                }}/>
                            </div>
                        </div>
                    </div>
                    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 my-4`} id={`gameContainer`}>
                        {games.map(game => {
                            return <div key={game.slug}>
                                <Link href={`/games/[GameSlug]/[ProjectType]`} as={`/games/${game.slug}/${game.defaultProjectType}`}>

                                    <a>
                                        <picture>
                                            {game.logoURL.sources.map(value =>
                                                <source key={value.src + "-" + value.type} srcSet={value.src} type={value.type}/>)}
                                            <source srcSet={game.logoURL.fallback.src} type={game.logoURL.fallback.type}/>
                                            <img src={game.logoURL.fallback.src} className={`w-full`}/>
                                        </picture>
                                    </a>

                                </Link>

                            </div>;
                        })}
                    </div>
                </div>
            </>
        </Layout>
    );
}

export async function getServerSideProps(context: NextPageContext) {
    let theme = getTheme(context);
    let { sort = "", search = "" } = context.query;

    let params = new URLSearchParams();
    if (sort) {
        params.set("sort", `${sort}`);
    }
    if (search && search.length) {
        params.set("search", `${search}`);
    }

    let games = await get(`${API_URL}/v1/site/games${params.toString() ? `?${params.toString()}` : ``}`);
    return {
        props: { theme, games: games.data.games, sorts: games.data.sort, currentSort: sort.length ? sort : `name`, search: search ?? `` } // will be passed to the page component as props
    };
}

