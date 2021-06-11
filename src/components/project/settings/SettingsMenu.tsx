import Link from "next/link";
import { ReactNode } from "react";

// These correspond to the page names as well!
export const OPTIONS = {
    DESCRIPTION: "description",
    LOGO: "logo",
    TEAM_MEMBERS: "members",
    NYI: "nyi"
};

export default function SettingsMenu({
    currentOption,
    gameSlug,
    projectType,
    projectSlug
}: {
    currentOption: string;
    gameSlug: string;
    projectType: string;
    projectSlug: string;
}): JSX.Element {
    return (
        <>
            <SettingsSideBar currentOption={currentOption} gameSlug={gameSlug} projectType={projectType} projectSlug={projectSlug} />
            <SettingsBar />
        </>
    );
}

export function SettingsSideBar({
    currentOption,
    gameSlug,
    projectType,
    projectSlug
}: {
    currentOption: string;
    gameSlug: string;
    projectType: string;
    projectSlug: string;
}): JSX.Element {
    return (
        <div className={`hidden lg:block lg:w-1/3 xl:w-56 flex-none`}>
            <div className={` border border-gray-400 dark:border-dark-600 `}>
                <SettingsGroup headerName="Display">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.DESCRIPTION}
                        currentValue={currentOption}
                        gameSlug={gameSlug}
                        projectType={projectType}
                        projectSlug={projectSlug}
                    >
                        Description
                    </SettingsSideBarOption>
                    <SettingsSideBarOption
                        optionValue={OPTIONS.LOGO}
                        currentValue={currentOption}
                        gameSlug={gameSlug}
                        projectType={projectType}
                        projectSlug={projectSlug}
                    >
                        Logo
                    </SettingsSideBarOption>
                </SettingsGroup>
                <SettingsGroup headerName="Team">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.TEAM_MEMBERS}
                        currentValue={currentOption}
                        gameSlug={gameSlug}
                        projectType={projectType}
                        projectSlug={projectSlug}
                    >
                        Team Members
                    </SettingsSideBarOption>
                </SettingsGroup>
                <SettingsGroup headerName="Webhooks">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.NYI}
                        currentValue={currentOption}
                        gameSlug={gameSlug}
                        projectType={projectType}
                        projectSlug={projectSlug}
                    >
                        NYI
                    </SettingsSideBarOption>
                </SettingsGroup>
                <SettingsGroup headerName="Analytics">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.NYI}
                        currentValue={currentOption}
                        gameSlug={gameSlug}
                        projectType={projectType}
                        projectSlug={projectSlug}
                    >
                        NYI
                    </SettingsSideBarOption>
                </SettingsGroup>
            </div>
        </div>
    );
}

function SettingsGroup({ headerName, children }: { headerName: string; children: ReactNode }): JSX.Element {
    return (
        <>
            <div className={`border-b border-gray-400 dark:border-dark-600 text-center p-1 bg-gray-300 dark:bg-dark-700`}>{headerName}</div>
            <div>{children}</div>
        </>
    );
}

function SettingsSideBarOption({
    children,
    optionValue,
    currentValue,
    gameSlug,
    projectType,
    projectSlug
}: {
    children: ReactNode;
    optionValue: string;
    currentValue: string;
    gameSlug: string;
    projectType: string;
    projectSlug: string;
}): JSX.Element {
    function isCurrent() {
        return optionValue === currentValue;
    }

    return (
        <>
            {!isCurrent() && optionValue !== OPTIONS.NYI ? (
                <Link href={`/games/${gameSlug}/${projectType}/${projectSlug}/settings/${optionValue}`}>
                    <a>
                        <div
                            className={`p-1 text-center  cursor-pointer select-none ${
                                isCurrent() ? `bg-diluv-300 dark:bg-diluv-800` : `hover:bg-gray-200 dark-hover:bg-dark-800`
                            }`}
                        >
                            {children}
                        </div>
                    </a>
                </Link>
            ) : (
                <>
                    <div
                        className={`p-1 text-center  cursor-pointer select-none ${
                            isCurrent() ? `bg-diluv-300 dark:bg-diluv-800` : `hover:bg-gray-200 dark-hover:bg-dark-800`
                        }`}
                    >
                        {children}
                    </div>
                </>
            )}
        </>
    );
}

export function SettingsBar(): JSX.Element {
    return (
        <div className={`lg:hidden border-l-2 border-b-2 border-r-2 border-gray-300 dark:border-dark-700 flex-none`}>
            <div className={`flex flex-col`}>
                <div className={`bg-diluv-600 p-2 border border-dark-700`}>Settings</div>
                <div className={`bg-diluv-700 p-2 border border-dark-700`}>Display</div>

                <div className={`bg-dark-800 hover:bg-diluv-900 select-none cursor-pointer p-2 border border-dark-700`}>Description</div>
                <div className={`bg-dark-800 hover:bg-diluv-900 select-none cursor-pointer p-2 border border-dark-700`}>Logo</div>
            </div>
        </div>
    );
}
