import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { get } from "utils/request";
import { API_URL } from "utils/api";

export default function GameSlug(): JSX.Element {
    return <> </>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug } = context.query;
    await get(`${API_URL}/v1/site/games/${GameSlug}`)
        .then(value => {
            context.res?.writeHead(302, {
                "Location": `/games/${GameSlug}/${value.data}`,
                "Content-Type": "text/html; charset=utf-8"
            });
            context.res?.end();
        })
        .catch(() => {
            context.res?.writeHead(302, {
                "Location": `/games/`,
                "Content-Type": "text/html; charset=utf-8"
            });
            context.res?.end();
        });

    return {
        props: { none: "" }
    };
};
