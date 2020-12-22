import React, { useEffect } from "react";
import { __DILUV, useSession } from "../utils/api";
import { initGA, pageView } from "../components/analytics/Analytics";

export default function Feedback(): JSX.Element {
    const [session, loading] = useSession()
    useEffect(() => {
        if(session){
            window.parent.postMessage({
                event_id: "auth",
                data: session
            }, location.protocol + "//" + location.host);
        }
    }, [loading]);
    return (
        <>
        </>
    );
}
