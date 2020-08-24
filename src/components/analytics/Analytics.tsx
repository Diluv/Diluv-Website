import { GOOGLE_ANALYTICS_KEY } from "utils/api";
import ReactGA from "react-ga";

export const initGA = (url: string) => {
    if (!GOOGLE_ANALYTICS_KEY) {
        return <></>;
    }
    if (!window.ga) {
        ReactGA.initialize(GOOGLE_ANALYTICS_KEY);
        pageView(url);
    }
};

export const pageView = (url: string) => {
    if (window.ga) {
        ReactGA.pageview(url);
    }
};