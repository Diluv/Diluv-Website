import dynamic from "next/dynamic";

export const FormattedTime = dynamic(() => import("components/misc/FormattedTime"), { ssr: false });

export const FormattedTimeDistance = dynamic(() => import("components/misc/FormattedTimeDistance"), { ssr: false });
