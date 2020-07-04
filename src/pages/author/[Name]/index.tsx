import React from "react";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import { AuthorPage, HasTheme, Sort } from "../../../interfaces";
import { getTheme, reactSelectStyle } from "../../../utils/theme";
import { get } from "../../../utils/request";
import { API_URL } from "../../../utils/api";
import moment from "moment";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
// @ts-ignore
import { getSession } from "next-auth/client";
import AuthorProjectCard from "../../../components/project/AuthorProjectCard";
import Select from "react-select";
import CheveronLeft from "../../../components/icons/CheveronLeft";
import CheveronRight from "../../../components/icons/CheveronRight";
import NavigationMore from "../../../components/icons/NavigationMore";
// @ts-ignore
import ReactPaginate from "@jaredlll08/react-paginate";

function buildURL(page: number, sort: string) {
    let params = new URLSearchParams();

    if (page !== 1) {
        params.append("page", page + "");
    }
    if (sort !== "popular") {
        params.append("sort", sort);
    }
    params.sort();
    if (params.toString().length) {
        return `?${params.toString()}`;
    }
    return ``;
}

export default function ProjectIndex({ theme, data, currentSort, page }: { data: AuthorPage, currentSort: string, page: number } & HasTheme) {

    let maxPage = Math.ceil(data.projects.length / 5);
    page = Number(page);

    function getSortFromCurrent(): Sort {
        for (let sort of data.sort) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return data.sort[0];
    }

    return (<Layout title={data.user.displayName} theme={theme}>
            <div className={`container mx-auto my-8`}>
                <div className={`w-11/12 mx-auto`}>
                    <div className={`grid col-gap-2 row-gap-2 sm:row-gap-0 profilePageSmall sm:profilePageLarge`}>
                        <div className={`area-image`}>
                            <img src={data.user.avatarURL}/>
                        </div>
                        <div className={`area-summary`}>
                            <h3>{data.user.displayName}</h3>
                            <Tippy content={
                                <div
                                    className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
                                    {moment.utc(data.user.createdAt).calendar()}
                                </div>} followCursor={true} plugins={[followCursor]} duration={0} hideOnClick={false}>
                                <span>Joined {moment(data.user.createdAt).fromNow()}</span>
                            </Tippy>


                        </div>
                    </div>

                    <section className={`my-4`}>
                        <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info`}>
                            <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                                <span className={`cursor-default select-none text-diluv-600`}>Projects</span>
                            </div>
                        </div>
                        <div className={`grid grid-rows-2 sm:grid-rows-none row-gap-2 sm:grid-cols-2 md:grid-cols-3 sm:col-gap-2 md:col-gap-0 sm:row-gap-0 mt-4 mb-2`}>
                            <div className={`md:col-start-1`}>
                                <Select isSearchable={true} inputId="sortProjects"
                                        defaultValue={{ value: getSortFromCurrent().slug, label: getSortFromCurrent().displayName }}
                                        options={data.sort.map(value => {
                                            return { value: value.slug, label: value.displayName };
                                        })}
                                        styles={reactSelectStyle} classNamePrefix={"select"}/>
                            </div>
                            <div className={`md:col-start-3 my-auto`}>
                                <ReactPaginate
                                    previousLabel={<CheveronLeft className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                    nextLabel={<CheveronRight className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                    breakLabel={<NavigationMore className={`mx-auto`} width={`1rem`} height={`1rem`}/>}
                                    pageCount={maxPage === 0 ? 1 : maxPage}
                                    marginPagesDisplayed={1}
                                    initialPage={page - 1}
                                    forcePage={page - 1}
                                    disableInitialCallback={true}
                                    pageRangeDisplayed={3}
                                    containerClassName={`grid grid-cols-pagination`}
                                    activeClassName={`bg-gray-400 hover:bg-gray-400 dark:bg-dark-800 dark-hover:bg-dark-800`}
                                    activeLinkClassName={`block`}
                                    pageClassName={`block bg-gray-200 hover:bg-gray-300 dark-hover:bg-dark-600 dark:bg-dark-700 border dark:border-dark-600 text-center`}
                                    pageLinkClassName={`block py-1`}

                                    previousClassName={`border dark:border-dark-600 text-center px-auto ${page === 1 || (maxPage === 0) ? `bg-white dark:bg-dark-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-dark-700`}`}
                                    previousLinkClassName={`block fill-current py-2`}

                                    breakClassName={`block bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 border dark:border-dark-600 text-center`}
                                    breakLinkClassName={`block fill-current py-2`}

                                    nextClassName={`block border dark:border-dark-600 text-center ${page === maxPage ? `bg-white dark:bg-dark-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-dark-700`}`}
                                    nextLinkClassName={`block fill-current py-2`}
                                    asBuilder={(pageIndex: number) => {
                                        if (pageIndex === 1 && maxPage === 0) {
                                            return "";
                                        }
                                        let newUrl = buildURL(pageIndex, currentSort);
                                        return `/author/${data.user.username}${newUrl}`;
                                    }}
                                    hrefBuilder={(pageIndex: number) => {
                                        if (pageIndex === 1 && maxPage === 0) {
                                            return "";
                                        }
                                        let newUrl = buildURL(pageIndex, currentSort);
                                        return `/author/[Name]${newUrl}`;
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            {data.projects.map(value =>
                                <AuthorProjectCard project={value} key={value.slug}/>)}
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}


export async function getServerSideProps(context: NextPageContext) {
    let theme = getTheme(context);
    let { Name, sort = "", page = 1 } = context.query;
    page = Number(page);

    let params = new URLSearchParams();
    if (page) {
        params.append("page", `${page}`);
    }
    if (sort) {
        params.set("sort", `${sort}`);
    }
    let session = (await getSession());
    let headers: { Accept: string, Authorization?: string | undefined } = {
        Accept: "application/json"
    };
    if (session) {
        headers.Authorization = `Bearer ${session.accesstoken}`;
    }
    params.sort();
    let data = await get(`${API_URL}/v1/site/author/${Name}${params.toString() ? `?${params.toString()}` : ``}`, headers);
    return {
        props: { theme, data: data.data, currentSort: sort.length ? sort : `old`, page: page } // will be passed to the page component as props
    };
}