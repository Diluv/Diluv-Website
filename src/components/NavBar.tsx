import React, { useEffect, useState } from "react";
import Drop from "./icons/Drop";
import Link from "next/link";
import DropDown, { DropDownAction, DropDownLinkInternal, DropDownSpacer } from "./Dropdown";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import { signin, signout, useSession } from "next-auth/client";
import { getNameOrDefault } from "utils/auth";
import { SessionWithExtra } from "interfaces";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

function NavBar(): JSX.Element {
    const [showingMenu, setShowingMenu] = useState(false);
    const [showUserMenu, setShowingUserMenu] = useState(false);
    const [session, loading] = useSession() as [SessionWithExtra | null, boolean];

    // If there is an invalid session, just kill it
    useEffect(() => {
        if(session && session.error){
            signout();
        }
    }, [session])

    return (
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
                        type={"button"}
                        aria-label={"Open NavBar Dropdown"}
                        className={`border border-gray-500 hover:text-white hover:border-white p-1 block md:hidden`}
                        onClick={() => setShowingMenu(!showingMenu)}
                    >
                        {showingMenu ? (
                            <XIcon className={`fill-current w-5 h-5 block md:hidden`} />
                        ) : (
                            <MenuIcon className={`fill-current w-5 h-5 block md:hidden`} />
                        )}
                    </button>
                </div>
                <div
                    className={`w-full md:w-auto md:flex-grow flex flex-col md:flex-row justify-between md:inline-flex ${
                        showingMenu ? `block` : `hidden`
                    }`}
                >
                    <nav
                        className="md:mr-auto md:ml-4 md:py-auto md:pl-4 md:border-l md:border-gray-700 flex flex-col md:flex-row flex-wrap items-center text-base text-center justify-center">
                        <Link href={"/"}>
                            <a className="nav-link">Home</a>
                        </Link>
                        <Link href={"/games"}>
                            <a className="nav-link">Games</a>
                        </Link>
                        <Link href={"/docs/feedback"}>
                            <a className="nav-link">Feedback</a>
                        </Link>
                    </nav>
                    <div className="hidden md:flex gap-x-4">
                        {session ? <DropDown name={getNameOrDefault(session, "Account")} className={`hover:text-white`}>
                            <DropDownLinkInternal href={`/author/${session.user?.id}`}>Profile</DropDownLinkInternal>
                            <DropDownAction action={async () => {
                                await signout();
                            }}>
                                Sign out
                            </DropDownAction>
                            <DropDownSpacer />
                        </DropDown> : <span className={`nav-link cursor-pointer`} tabIndex={0} onClick={async () => {
                            await signin("DILUV");
                        }}>
                            Sign in
                        </span>}
                        <ThemeSwitcher />
                    </div>
                    <div className={`block md:hidden text-center`}>
                        {session ? <>
                            <p className={`hover:text-white cursor-pointer p-2 md:p-0`} onClick={() => setShowingUserMenu(!showUserMenu)}>
                                {getNameOrDefault(session, "Account")}
                            </p>
                            <div className={`${showUserMenu ? `block` : `hidden`}`}>
                                <div className={`flex flex-col`}>
                                    <Link href={`/author/${session.user?.id}`}>
                                        <a className={`p-2`}>Profile</a>
                                    </Link>
                                    <span
                                        className={`nav-link p-2 md:p-0 cursor-pointer`}
                                        tabIndex={0}
                                        onClick={async () => {
                                            await signout();
                                        }}
                                    >Sign out</span>
                                </div>
                            </div>
                        </> : <>
                            <span
                                className={`nav-link cursor-pointer p-2 md:p-0`}
                                tabIndex={0}
                                onClick={async () => {
                                    await signin("DILUV");
                                }}>Sign in
                            </span>
                        </>}
                        <div className={`mx-auto p-2`}>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default NavBar;
