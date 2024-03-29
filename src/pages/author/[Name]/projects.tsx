import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AuthorPage, SessionWithExtra, SlugName, Sort } from "interfaces";
import { reactSelectStyle } from "utils/theme";
import { get, getAuthed } from "utils/request";
import { API_URL } from "utils/api";
import AuthorProjectCard from "components/project/AuthorProjectCard";
import Select from "react-select";
import Pagination, { buildURL } from "components/misc/Pagination";
import { useRouter } from "next/router";
import GridArea from "components/misc/GridArea";
import Image from "next/image";
import { getSession, useSession } from "next-auth/client";
import { LineMenu, LineMenuItem } from "../../../components/ui/LineMenu";
import TimeTooltip from "../../../components/misc/TimeTooltip";

export default function AuthorProjects({
    data,
    sorts,
    currentSort,
    page
}: { data: AuthorPage; sorts: Sort, currentSort: string; page: number }): JSX.Element {
    const maxPage = Math.ceil(data.projectCount / 20);
    page = Number(page);
    const [session, loading] = useSession() as [SessionWithExtra, boolean];
    return (
        <Layout
            title={data.user.displayName}
            canonical={`/author/${data.user.username}/projects`}
            description={`${data.user.displayName} | Diluv`}
            image={`${data.user.avatar.sources[0].src}`}
            url={`/author/${data.user.username}/projects`}
        >
            <div className={`container mx-auto mt-4`}>
                <div className={`w-11/12 mx-auto`}>
                    <div className={`grid gap-x-2 gap-y-2 sm:gap-y-0 profilePage`}>
                        <GridArea name={`image`} className={`mx-auto sm:mx-0`}>
                            <Image src={data.user.avatar.sources[0].src}
                                   alt={data.user.displayName}
                                   width={256}
                                   height={256}
                                   priority={true}
                                   loading={"eager"} />
                        </GridArea>
                        <GridArea name={`summary`}>
                            <h3>{data.user.displayName}</h3>
                            <TimeTooltip id={`joined-tooltip`} prefix={`Joined `} time={data.user.createdAt} />
                        </GridArea>
                    </div>

                    <LineMenu current={`projects`}>
                        <LineMenuItem itemKey={`projects`} side={`left`} href={`/author/${data.user.username}/projects`}
                                      preset={`normal`}> Projects</LineMenuItem>
                        <LineMenuItem itemKey={`tokens`} side={`right`} href={`/author/${data.user.username}/tokens`}
                                      preset={`authed`} hidden={!(session && data.user.username === session.user?.id)}> Tokens</LineMenuItem>
                    </LineMenu>
                    <section className={`my-4`}>
                        <ProjectOptions data={data} page={page} maxPage={maxPage} currentSort={currentSort} sorts={sorts} />
                        <div className={`my-4`}>
                            {data.projects.map((value) => (
                                <AuthorProjectCard project={value} key={value.slug} />
                            ))}
                        </div>
                        <ProjectOptions data={data} page={page} maxPage={maxPage} currentSort={currentSort} showSorts={false} sorts={sorts} />
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
    showSorts = true,
    sorts
}: {
    data: AuthorPage;
    page: number;
    maxPage: number;
    currentSort: string;
    showSorts?: boolean;
    sorts: Sort;
}) {
    function getSortFromCurrent(): SlugName {
        for (const sort of sorts.project) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return sorts.project[0];
    }

    const router = useRouter();
    return (
        <div className={`grid grid-rows-2 sm:grid-rows-none gap-y-2 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-2 md:gap-x-0 sm:gap-y-0`}>
            {showSorts && (
                <div className={`md:col-start-1`}>
                    <Select
                        isSearchable={false}
                        inputId="sortProjects"
                        defaultValue={{ value: getSortFromCurrent().slug, label: getSortFromCurrent().name }}
                        options={sorts.project.map((value) => {
                            return { value: value.slug, label: value.name };
                        })}
                        styles={reactSelectStyle}
                        onChange={(e: any) => {
                            const newUrl = buildURL({
                                page: page,
                                sort: e.value,
                                defaultSort: "new"
                            });
                            router.push(`/author/${data.user.username}/projects${newUrl}`);
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
                        return `/author/${data.user.username}/projects${newUrl}`;
                    }}
                    hrefBuilder={(pageIndex: number) => {
                        const newUrl = buildURL({
                            page: pageIndex,
                            sort: currentSort,
                            defaultSort: "new"
                        });
                        return `/author/[Name]/projects${newUrl}`;
                    }}
                />
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
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
    const data = await getAuthed(`${API_URL}/v1/site/author/${Name}${params.toString() ? `?${params.toString()}` : ``}`, { session });
    const sorts = await get(`${API_URL}/v1/site/sort`);

    return {
        props: { data: data.data, sorts: sorts.data, currentSort: sort.length ? sort : `new`, page: page, session } // will be passed to the page component as props
    };
};
