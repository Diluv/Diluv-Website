import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { get } from "utils/request";
import { API_URL } from "utils/api";

export default function GameSlug(): JSX.Element {
    return <> </>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug } = context.query;
    const type = await get(`${API_URL}/v1/site/games/${GameSlug}`);

    context.res?.writeHead(302, {
        "Location": `/games/${GameSlug}/${type.data}`,
        "Content-Type": "text/html; charset=utf-8"
    });
    context.res?.end();
    return {
        props: { none: "" }
    };
};
