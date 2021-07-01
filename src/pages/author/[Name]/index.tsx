import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Index() {
    return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let { Name } = context.query;

    return {
        redirect: {
            destination: `/author/${Name}/projects`,
            permanent: true
        }
    };
};