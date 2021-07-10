import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AuthorPage, SlugName, Token } from "interfaces";
import { reactSelectStyle } from "utils/theme";
import { getAuthed } from "utils/request";
import { API_URL } from "utils/api";
import { followCursor } from "tippy.js";
import Tippy from "@tippyjs/react";
import Select from "react-select";
import Pagination, { buildURL } from "components/misc/Pagination";
import { useRouter } from "next/router";
import GridArea from "components/misc/GridArea";
import { FormattedTime } from "utils/dynamic";
import Image from "next/image";
import { getSession } from "next-auth/client";
import { LineMenu, LineMenuItem } from "../../../components/ui/LineMenu";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { TimeTooltip } from "../../../components/misc/TimeTooltip";
import FormattedTimeDistance from "components/misc/FormattedTimeDistance";

export default function AuthorProjects({ data, tokens }: { data: AuthorPage; tokens: Token[]; }): JSX.Element {

    return (
        <Layout
            title={data.user.displayName}
            canonical={`/author/${data.user.username}`}
            description={`${data.user.displayName} | Diluv`}
            image={`${data.user.avatarURL}`}
            url={`/author/${data.user.username}`}
        >
            <div className={`container mx-auto mt-4`}>
                <div className={`w-11/12 mx-auto`}>
                    <div className={`grid gap-x-2 gap-y-2 sm:gap-y-0 profilePage`}>
                        <GridArea name={`image`} className={`mx-auto sm:mx-0`}>
                            <Image src={data.user.avatarURL}
                                   alt={data.user.displayName}
                                   width={256}
                                   height={256}
                                   priority={true}
                                   loading={"eager"} />
                        </GridArea>
                        <GridArea name={`summary`}>
                            <h3>{data.user.displayName}</h3>
                            <Tippy
                                content={
                                    <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
                                        <FormattedTime time={data.user.createdAt} />
                                    </div>
                                }
                                followCursor={true}
                                plugins={[followCursor]}
                                duration={0}
                                hideOnClick={false}
                            >
                                <div className={`w-auto inline-block`}>
                                    <FormattedTimeDistance start={data.user.createdAt} prefix={`Joined `} />
                                </div>
                            </Tippy>
                        </GridArea>
                    </div>

                    <LineMenu current={`tokens`}>
                        <LineMenuItem itemKey={`projects`} side={`left`} href={`/author/${data.user.username}/projects`}
                                      preset={`normal`}> Projects</LineMenuItem>
                        <LineMenuItem itemKey={`tokens`} side={`right`} href={`/author/${data.user.username}/tokens`}
                                      preset={`authed`}> Tokens</LineMenuItem>
                    </LineMenu>
                    <section className={`my-4`}>
                        <div className={`max-w-2prose m-auto p-4 bg-gray-200 dark:bg-dark-850 border border-gray-300 dark:border-gray-700`}>
                            <Table className={`table-diluv`}>
                                <Thead>
                                    <Tr className={`table-head-row-diluv`}>
                                        <Th className={`table-head-diluv`}>ID</Th>
                                        <Th className={`table-head-diluv lg:w-[50ch]`}>Name</Th>
                                        <Th className={`table-head-diluv`}>Created</Th>
                                        <Th className={`table-head-diluv`}>Last Used</Th>
                                        <Th className={`table-head-diluv`}>Delete</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {tokens.map(token => {
                                        return <Tr key={token.id} className={`table-body-row-diluv text-center`}>
                                            <Td className={`table-data-diluv`}>
                                                {token.id}
                                            </Td>
                                            <Td className={`table-data-diluv`}>
                                                {token.name}
                                            </Td>
                                            <Td className={`table-data-diluv`}>
                                                <TimeTooltip id={`createdAtTip`} time={token.createdAt} />
                                            </Td>
                                            <Td className={`table-data-diluv`}>
                                                <TimeTooltip id={`lastUsedTip`} time={token.lastUsed} />
                                            </Td>
                                            <Td className={`table-data-diluv td-full p-0`}>

                                                <button className={`fill-current mx-auto btn btn-cancel text-center`}>Delete</button>
                                            </Td>
                                        </Tr>;
                                    })}
                                </Tbody>
                            </Table>

                        </div>
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
    function getSortFromCurrent(): SlugName {
        for (const sort of data.sort) {
            if (sort.slug === currentSort) {
                return sort;
            }
        }
        return data.sort[0];
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
                        options={data.sort.map((value) => {
                            return { value: value.slug, label: value.name };
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
    let { Name } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/site/author/${Name}`, { session });
    const tokens = await getAuthed(`${API_URL}/v1/users/self/token`, { session });
    console.log(tokens.data);

    return {
        props: { data: data.data, tokens: tokens.data.tokens, session }
    };
};
