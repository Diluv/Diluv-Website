import React, { useState } from "react";
import Drop from "./icons/Drop";
import Link from "next/link";
import DropDown, { DropDownLink, DropDownLinkInternal, DropDownSpacer } from "./Dropdown";
import { useSession } from "../utils/api";
import ThemeSwitcher from "./ui/ThemeSwitcher";

function NavBar(): JSX.Element {
    const [showingMenu, setShowingMenu] = useState(false);
    const [showUserMenu, setShowingUserMenu] = useState(false);
    const [session, loading] = useSession();

    return (
        <>
            <header className="text-gray-200 font-hero bg-gradient-to-br from-diluv-800 to-diluv-900">
                <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row justify-between md:justify-start items-center">
                    <div className={`w-full md:w-auto flex flex-row justify-between items-center`}>
                        <Link href={"/"}>
                            <a className="flex font-medium items-center text-white md:mb-0">
                                <Drop className={`w-10 h-10`} />
                                <span className="ml-3 text-xl">Diluv</span>
                            </a>
                        </Link>
                        <button
                            className={`border border-gray-500 hover:text-white hover:border-white p-1 block md:hidden`}
                            onClick={() => setShowingMenu(!showingMenu)}
                        >
                            {showingMenu ? (
                                <svg className={`fill-current w-5 h-5 block md:hidden`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                                </svg>
                            ) : (
                                <svg className={`fill-current w-5 h-5 block md:hidden`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div
                        className={`w-full md:w-auto md:flex-grow flex flex-col md:flex-row justify-between md:inline-flex ${
                            showingMenu ? `block` : `hidden`
                        }`}
                    >
                        <nav className="md:mr-auto md:ml-4 md:py-auto md:pl-4 md:border-l md:border-gray-700 flex flex-col md:flex-row flex-wrap items-center text-base text-center justify-center">
                            <Link href={"/"}>
                                <a className="md:mr-5 hover:text-white w-full md:w-auto block md:inline p-2 md:p-0">Home</a>
                            </Link>
                            <Link href={"/games"}>
                                <a className="md:mr-5 hover:text-white w-full md:w-auto block md:inline p-2 md:p-0">Games</a>
                            </Link>
                            <Link href={"/docs/feedback"}>
                                <a className="md:mr-5 hover:text-white w-full md:w-auto block md:inline p-2 md:p-0">Feedback</a>
                            </Link>
                        </nav>
                        <div className="hidden md:flex gap-x-4">
                            <DropDown name={session ? session.user.preferred_username : "Account"} className={`hover:text-white`}>
                                {!session ? (
                                    <DropDownLink href={"/api/login"}>Sign in</DropDownLink>
                                ) : (
                                    <>
                                        <DropDownLinkInternal href={`/author/${session.user.username}`}>Profile</DropDownLinkInternal>
                                        <DropDownLink href={"/api/logout"}>Sign out</DropDownLink>
                                    </>
                                )}
                                <DropDownSpacer />
                            </DropDown>
                            <ThemeSwitcher />
                        </div>
                        <div className={`block md:hidden text-center`}>
                            <p className={`hover:text-white cursor-pointer p-2 md:p-0`} onClick={() => setShowingUserMenu(!showUserMenu)}>
                                {session ? session.user.preferred_username : "Account"}
                            </p>
                            <div className={`${showUserMenu ? `block` : `hidden`}`}>
                                <div className={`flex flex-col`}>
                                    {!session ? (
                                        <a className={`hover:text-white p-2 md:p-0`} href={"/api/login"}>
                                            Sign in
                                        </a>
                                    ) : (
                                        <>
                                            <Link href={`/author/${session.user.username}`}>
                                                <a>Profile</a>
                                            </Link>
                                            <a className={`hover:text-white p-2 md:p-0`} href={"/api/logout"}>
                                                Sign out
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={`mx-auto p-2`}>
                                <ThemeSwitcher />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default NavBar;
