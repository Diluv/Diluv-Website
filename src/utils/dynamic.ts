import dynamic from "next/dynamic";

export const FormattedTime = dynamic(() => import("components/misc/FormattedTime"), { ssr: false });

export const ClientReactTooltip = dynamic(() => import("react-tooltip"), { ssr: false });

