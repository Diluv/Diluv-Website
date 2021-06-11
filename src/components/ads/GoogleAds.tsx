import React, { useEffect } from "react";
import { GoogleAdProps } from "interfaces";
import { GOOGLE_ADSENSE_KEY } from "utils/api";

function GoogleAds({ format = "auto", responsive = true, slot, className = "" }: GoogleAdProps): JSX.Element {
    useEffect(() => {
        if (!window.adsbygoogle) {
            const s = document.createElement("script");
            s.setAttribute("src", "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
            s.setAttribute("async", "true");
            document.head.appendChild(s);
        }
    }, []);

    return (
        <ins
            className={`adsbygoogle block ${className}`}
            data-ad-client={GOOGLE_ADSENSE_KEY}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive}
        />
    );
}

export default GoogleAds;
