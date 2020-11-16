import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Settings(): JSX.Element {
    return <> </>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { GameSlug, ProjectType, ProjectSlug } = context.query;
    
    context.res?.writeHead(302, {
        "Location": `/games/${GameSlug}/${ProjectType}/${ProjectSlug}/settings/description`,
        "Content-Type": "text/html; charset=utf-8"
    });
    context.res?.end();

    return {
        props: { none: "" }
    };
};
