import React from "react";
import Drop from "./icons/Drop";
import Link from "next/link";

function Footer(): JSX.Element {
    return (
        <>
            <footer className="font-hero bg-gradient-to-b from-blue-gray-800 to-blue-gray-900">
                <div className="container px-5 py-8 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-no-wrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <Link href={`/`}>
                            <a className="inline-flex font-medium items-center md:justify-start justify-center text-white">
                                <Drop className={`w-10 h-10`} />
                                <span className="ml-3 text-xl">Diluv</span>
                            </a>
                        </Link>

                        <p className="mt-2 text-sm text-gray-400">For modders, by modders</p>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 md:mt-0 mt-10 md:text-left text-center">
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-10 lg:mb-0">
                            <h2 className="font-medium text-white tracking-widest text-sm mb-3">PRODUCT</h2>
                            <nav className="list-none">
                                <p>
                                    <a className="text-gray-400 hover:text-white" href={"https://github.com/Diluv"}>
                                        Github
                                    </a>
                                </p>
                                <p>
                                    <Link href={"/docs/formatting"}>
                                        <a className="text-gray-400 hover:text-white">Formatting Guide</a>
                                    </Link>
                                </p>
                            </nav>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-10 lg:mb-0">
                            <h2 className="font-medium text-white tracking-widest text-sm mb-3">ABOUT</h2>
                            <nav className="list-none">
                                <p>
                                    <Link href={"/about"}>
                                        <a className="text-gray-400 hover:text-white">About</a>
                                    </Link>
                                </p>
                                <p>
                                    <Link href={"/docs/privacy"}>
                                        <a className="text-gray-400 hover:text-white">Privacy</a>
                                    </Link>
                                </p>
                                <p>
                                    <Link href={"/docs/terms"}>
                                        <a className="text-gray-400 hover:text-white">Terms Of Service</a>
                                    </Link>
                                </p>
                                <p>
                                    <Link href={"/docs/conduct"}>
                                        <a className="text-gray-400 hover:text-white">Code of Conduct</a>
                                    </Link>
                                </p>
                                <p>
                                    <Link href={"/docs/disclosure"}>
                                        <a className="text-gray-400 hover:text-white">Responsible Disclosure</a>
                                    </Link>
                                </p>
                            </nav>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4 mb-10 md:mb-0">
                            <h2 className="font-medium text-white tracking-widest text-sm mb-3">CONTACT</h2>
                            <nav className="list-none">
                                <p>
                                    <a className="text-gray-400 hover:text-white" href={"https://twitter.com/DiluvMods"}>
                                        Twitter
                                    </a>
                                </p>
                                <p>
                                    <a className="text-gray-400 hover:text-white" href={"https://discord.diluv.com"}>
                                        Discord
                                    </a>
                                </p>
                                <p>
                                    <Link href={"/docs/feedback"}>
                                        <a className="text-gray-400 hover:text-white">Feedback</a>
                                    </Link>
                                </p>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
