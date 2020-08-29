import dynamic from "next/dynamic";

export const FormattedTime = dynamic(
        () => import("../components/misc/FormattedTime"),
        { ssr: false }
);

export const FormattedDistanceTime = dynamic(
        () => import("../components/misc/FormattedTimeDistance"),
        { ssr: false }
);