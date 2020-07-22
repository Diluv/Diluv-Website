import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext, NextPageContext } from "next";
import { AuthorPage, HasSession, HasTheme, Sort } from "../../../interfaces";
import { getTheme, reactSelectStyle } from "../../../utils/theme";
import { getAuthed } from "../../../utils/request";
import { API_URL } from "../../../utils/api";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
// @ts-ignore
import { getSession } from "next-auth/client";
import AuthorProjectCard from "../../../components/project/AuthorProjectCard";
import Select from "react-select";
import Pagination, { buildURL } from "../../../components/misc/Pagination";
import { useRouter } from "next/router";
import formatDistance from "date-fns/formatDistance";
import format from "date-fns/format";
import GridArea from "../../../components/misc/GridArea";

export default function AuthorProjects({
    theme,
    data,
    currentSort,
    page,
    session
}: { data: AuthorPage; currentSort: string; page: number } & HasTheme & HasSession): JSX.Element {
    const maxPage = Math.ceil(data.projectCount / 20);
    page = Number(page);

    return (
        <Layout title={data.user.displayName} theme={theme} session={session}>
            <div className={`container mx-auto mt-4`}>
                <div className={`w-11/12 mx-auto`}>
                    <div className={`grid col-gap-2 row-gap-2 sm:row-gap-0 profilePageSmall sm:profilePageLarge`}>
                        <GridArea name={`image`}>
                            <img src={data.user.avatarURL} alt={data.user.displayName} />
                        </GridArea>
                        <GridArea name={`summary`}>
                            <h3>{data.user.displayName}</h3>
                            <Tippy
                                content={
                                    <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
                                        {format(data.user.createdAt, "yyyy-MM-dd HH:mm:ss")}
                                    </div>
                                }
                                followCursor={true}
                                plugins={[followCursor]}
                                duration={0}
                                hideOnClick={false}
                            >
                                <span>Joined {formatDistance(data.user.createdAt, new Date(), { addSuffix: true })}</span>
                            </Tippy>
                        </GridArea>
                    </div>

                    <section className={`my-4`}>
                        <div className={`grid border-b-2 border-gray-300 dark:border-dark-700 grid-cols-project-info mb-4`}>
                            <div className={`px-2 pb-1 -mb-0.125 border-b-2 border-diluv-500 hover:border-diluv-500`}>
                                <span className={`cursor-default select-none text-diluv-600`}>Projects</span>
                            </div>
                        </div>
                        <ProjectOptions data={data} page={page} maxPage={maxPage} currentSort={currentSort} />
                        <div className={`my-4`}>
                            {data.projects.map((value) => (
                                <AuthorProjectCard project={value} key={value.slug} />
                            ))}
                        </div>
                        <ProjectOptions data={data} page={page} maxPage={maxPage} currentSort={currentSort} showSorts={false} />
                    </section>
                </div>
            </div>
        </Layout>
    );
}

function ProjectOptions({
    data,
    page,
    maxPage,
    currentSort,
    showSorts = true
}: {
    data: AuthorPage;
    page: number;
    maxPage: number;
    currentSort: string;
    showSorts?: boolean;
}) {
    function getSortFromCurrent(): Sort {
        for (const sort of data.sort) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return data.sort[0];
    }

    const router = useRouter();
    return (
        <div className={`grid grid-rows-2 sm:grid-rows-none row-gap-2 sm:grid-cols-2 md:grid-cols-3 sm:col-gap-2 md:col-gap-0 sm:row-gap-0`}>
            {showSorts && (
                <div className={`md:col-start-1`}>
                    <Select
                        isSearchable={true}
                        inputId="sortProjects"
                        defaultValue={{ value: getSortFromCurrent().slug, label: getSortFromCurrent().displayName }}
                        options={data.sort.map((value) => {
                            return { value: value.slug, label: value.displayName };
                        })}
                        styles={reactSelectStyle}
                        onChange={(e: any) => {
                            const newUrl = buildURL({
                                page: page,
                                sort: e.value,
                                defaultSort: "new"
                            });
                            router.push(`/author/[Name]${newUrl}`, `/author/${data.user.username}${newUrl}`);
                        }}
                        classNamePrefix={"select"}
                    />
                </div>
            )}
            <div className={`${showSorts ? `md:col-start-3` : ``} my-auto`}>
                <Pagination
                    maxPage={maxPage}
                    page={page}
                    asBuilder={(pageIndex: number) => {
                        const newUrl = buildURL({
                            page: pageIndex,
                            sort: currentSort,
                            defaultSort: "new"
                        });
                        return `/author/${data.user.username}${newUrl}`;
                    }}
                    hrefBuilder={(pageIndex: number) => {
                        const newUrl = buildURL({
                            page: pageIndex,
                            sort: currentSort,
                            defaultSort: "new"
                        });
                        return `/author/[Name]${newUrl}`;
                    }}
                />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const theme = getTheme(context);
    let { Name, sort = "", page = 1 } = context.query;
    page = Number(page);

    const params = new URLSearchParams();
    if (page) {
        params.append("page", `${page}`);
    }
    if (sort) {
        params.set("sort", `${sort}`);
    }
    const session = await getSession(context);
    params.sort();
    const data = await getAuthed(`${API_URL}/v1/site/author/${Name}${params.toString() ? `?${params.toString()}` : ``}`, { session: session });

    return {
        props: { theme, data: data.data, currentSort: sort.length ? sort : `new`, page: page, session: session ?? null } // will be passed to the page component as props
    };
};
