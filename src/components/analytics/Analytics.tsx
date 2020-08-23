import { GOOGLE_ANALYTICS_KEY } from "utils/api";

export const initGA = () => {
    if (!GOOGLE_ANALYTICS_KEY) {
        return <></>;
    }
    return (
        <>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_KEY}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GOOGLE_ANALYTICS_KEY}', {
                                  page_path: window.location.pathname,
                                });
                              `
                }}
            />
        </>
    );
};

export const pageView = (url: string) => {
    if (!GOOGLE_ANALYTICS_KEY) {
        return;
    }
    setTimeout(() => {
        // @ts-ignore
        window.gtag("config", GOOGLE_ANALYTICS_KEY, {
            page_location: url,
            page_title: document.title
        });
    }, 0);
};