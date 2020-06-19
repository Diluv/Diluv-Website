import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Head from "next/head";
import SimpleBar from "simplebar-react";

type Props = {
    children: JSX.Element | JSX.Element[]
    title: string
};

function Layout({
    children,
    title = "Diluv"
}: Props) {

    return (
        <SimpleBar className={`minmax-height`}>
            <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-dark-900 dark:text-dark-100`}>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8"/>
                </Head>
                <header>
                    <NavBar/>
                </header>
                <main className={`flex-grow`}>
                    {children}
                </main>
                <Footer/>
            </div>
        </SimpleBar>
    );
}

export default Layout;
