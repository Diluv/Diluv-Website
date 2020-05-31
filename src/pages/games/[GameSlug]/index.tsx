import React from "react";
import { NextPageContext } from "next";
import { get } from "utils/request";
import { API_URL } from "utils/api";

export default function GameSlug() {

  return <> </>
}

export async function getServerSideProps(context: NextPageContext) {
  let { GameSlug } = context.query;
  let types = await get(`${API_URL}/v1/games/${GameSlug}/types`);

  context.res?.writeHead(302, {
    Location: `/games/${GameSlug}/${types.data.data[0].slug}`,
    'Content-Type': 'text/html; charset=utf-8',
  });
  context.res?.end();
  return {
    props: { none: "" },
  }
}