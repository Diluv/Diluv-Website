import React from "react";
import dynamic from "next/dynamic";

const GoogleAds = dynamic(() => import("./GoogleAds"), { ssr: false });

function Ads(): JSX.Element {
    return (
        <div className={"ads"}>
            <GoogleAds slot={""} />
        </div>
    );
}

export default Ads;
