import "../css/index.css";
import "../css/markdown.css";
import "../css/admonition.css";
import "../css/reactselect.css";
import "../css/alerts.css";

import "simplebar/dist/simplebar.min.css";
import React, { createElement } from "react";
import { AppProps } from "next/app";
import { Session, SessionContext, useSession } from "../utils/api";

const Provider = ({ children, session }: { children: any, session: Session }) => {
    return createElement(SessionContext.Provider, { value: useSession(session) }, children);
};

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    );
}
