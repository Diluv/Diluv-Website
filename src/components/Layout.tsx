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
        <SimpleBar style={{ minHeight: "100vh", maxHeight: `100vh` }}>
            <div className={`min-h-screen flex flex-col`}>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8"/>
                </Head>
                <header>
                    <NavBar/>
                </header>
                <main className={`flex-grow dark:bg-gray-800 dark:text-white`}>
                    {children}
                </main>
                <Footer/>
            </div>
        </SimpleBar>
    );
}

export default Layout;
