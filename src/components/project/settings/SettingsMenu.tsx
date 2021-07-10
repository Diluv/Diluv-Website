import Link from "next/link";
import { ReactNode } from "react";
import { Project, SessionWithExtra } from "../../../interfaces";

// These correspond to the page names as well!
export const OPTIONS = {
    DESCRIPTION: "description",
    TEAM_MEMBERS: "members",
    NYI: "nyi",
    DELETE: "delete",
    TRANSFER: "transfer"
};

export default function SettingsMenu({
    currentOption,
    project,
    session
}: {
    currentOption: string;
    project: Project;
    session: SessionWithExtra
}): JSX.Element {
    return (
        <>
            <SettingsSideBar currentOption={currentOption} project={project} session={session} />
            <SettingsBar />
        </>
    );
}

export function SettingsSideBar({
    currentOption,
    project,
    session
}: {
    currentOption: string;
    project: Project;
    session: SessionWithExtra
}): JSX.Element {

    return (
        <div className={`hidden lg:block lg:w-1/3 xl:w-56 flex-none`}>
            <div className={`border border-gray-400 dark:border-dark-600 `}>
                <SettingsGroup headerName="Display">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.DESCRIPTION}
                        currentValue={currentOption}
                        project={project}
                    >
                        Description
                    </SettingsSideBarOption>
                </SettingsGroup>
                <SettingsGroup headerName="Team">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.TEAM_MEMBERS}
                        currentValue={currentOption}
                        project={project}
                    >
                        Team Members
                    </SettingsSideBarOption>
                </SettingsGroup>
                <SettingsGroup headerName="Webhooks">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.NYI}
                        currentValue={currentOption}
                        project={project}
                    >
                        NYI
                    </SettingsSideBarOption>
                </SettingsGroup>
                <SettingsGroup headerName="Analytics">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.NYI}
                        currentValue={currentOption}
                        project={project}
                    >
                        NYI
                    </SettingsSideBarOption>
                </SettingsGroup>
                <SettingsGroup headerName="Admin">
                    <SettingsSideBarOption
                        optionValue={OPTIONS.TRANSFER}
                        currentValue={currentOption}
                        project={project}
                        disabled={project.authors.filter(value => value.role === "owner")[0].username !== session.user?.id}
                    >
                        Transfer Project
                    </SettingsSideBarOption>
                    <SettingsSideBarOption
                        optionValue={OPTIONS.DELETE}
                        currentValue={currentOption}
                        project={project}
                        disabled={project.authors.filter(value => value.role === "owner")[0].username !== session.user?.id}
                    >
                        Delete Project
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
    project,
    disabled = false
}: {
    children: ReactNode;
    optionValue: string;
    currentValue: string;
    project: Project;
    disabled?: boolean;
}): JSX.Element {
    function isCurrent() {
        return optionValue === currentValue;
    }

    return (
        <>
            {!disabled && !isCurrent() && optionValue !== OPTIONS.NYI ? (
                <Link href={`/games/${project.game.slug}/${project.projectType.slug}/${project.slug}/settings/${optionValue}`}>
                    <a>
                        <div className={`p-1 text-center cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-dark-800`}>
                            {children}
                        </div>
                    </a>
                </Link>
            ) : (
                <>
                    <div
                        className={`p-1 text-center select-none ${disabled ? `bg-red-300 bg-opacity-50 cursor-not-allowed` : `cursor-pointer ${isCurrent() ? `bg-diluv-300 dark:bg-diluv-800` : `hover:bg-gray-200 dark:hover:bg-dark-800`}`}`}
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
            </div>
        </div>
    );
}
