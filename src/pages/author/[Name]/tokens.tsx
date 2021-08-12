import React from "react";
import Layout from "components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AuthorPage, Token } from "interfaces";
import { getAuthed } from "utils/request";
import { API_URL } from "utils/api";
import GridArea from "components/misc/GridArea";
import Image from "next/image";
import { getSession } from "next-auth/client";
import { LineMenu, LineMenuItem } from "../../../components/ui/LineMenu";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { TimeTooltip } from "../../../components/misc/TimeTooltip";

export default function AuthorProjects({ data, tokens }: { data: AuthorPage; tokens: Token[]; }): JSX.Element {

    return (
        <Layout
            title={data.user.displayName}
            canonical={`/author/${data.user.username}`}
            description={`${data.user.displayName} | Diluv`}
            image={`${data.user.avatar.sources[0].src}`}
            url={`/author/${data.user.username}`}
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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let { Name } = context.query;

    const session = await getSession(context);
    const data = await getAuthed(`${API_URL}/v1/site/author/${Name}`, { session });
    const tokens = await getAuthed(`${API_URL}/v1/users/self/tokens`, { session });
    console.log(tokens.data);

    return {
        props: { data: data.data, tokens: tokens.data.tokens, session }
    };
};