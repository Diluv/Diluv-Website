import React from "react";
import dynamic from "next/dynamic";

const GoogleAds = dynamic(() => import("./GoogleAds"), { ssr: false });

function Ads() {

    return (
        <div className={'ads'}>
            <GoogleAds slot={""}/>
        </div>
    );
}


export default Ads;