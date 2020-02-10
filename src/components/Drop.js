import React from "react";

const Drop = ({
                  style = {},
                  fill = "#000",
                  width = "101.76px",
                  height = "195.6px",
                  className = "",
                  viewBox = "0 0 101.76 195.6",
                  shapeRendering = "crispEdges"
              }) => (
        <svg version="1.1"
                // width="101.76px" height="195.6px" viewBox="0 0 101.76 195.6"
             width={width}
             style={style}
             height={height}
             viewBox={viewBox}
             xmlns="http://www.w3.org/2000/svg"
             className={`svg-icon ${className || ""}`}
             xmlnsXlink="http://www.w3.org/1999/xlink">
            <polyline fill={"hsl(180,60%,61%)"} points="53.271,64.581 46.458,58.94 50.724,33.706" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,60%)"} points="60.599,60.425 50.724,33.706 53.271,64.581" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,46%)"} points="60.599,60.425 59.88,95.331 40.896,108.253" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,58%)"} points="53.271,64.581 60.599,60.425 40.896,108.253" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,52%)"} points="24.099,105.487 40.896,108.253 53.271,64.581" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,60%)"} points="53.271,64.581 46.458,58.94 11.177,104.05 24.099,105.487" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,57%)"} points="24.099,105.487 11.177,104.05 0.271,136.931 24.567,138.144" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,52%)"} points="24.099,105.487 40.896,108.253 24.567,138.144" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,43%)"} points="24.567,138.144 45.567,126.175 40.896,108.253" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,52%)"} points="59.88,95.331 40.896,108.253 45.567,126.175" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,50%)"} points="45.567,126.175 57.089,130.092 59.88,95.331" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,36%)"} points="57.089,130.092 45.567,126.175 55.317,170.737" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,51%)"} points="45.567,126.175 24.567,138.144 55.317,170.737" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,41%)"} points="24.567,138.144 0.271,136.931 0.067,137.487 14.546,179.925" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,47%)"} points="55.317,170.737 14.546,179.925 24.567,138.144" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,34%)"} points="55.317,170.737 14.546,179.925 53.942,195.175" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,25%)"} points="96.396,174.112 55.317,170.737 53.942,195.175" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,48%)"} points="91.052,140.362 55.317,170.737 96.396,174.112" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,35%)"} points="91.052,140.362 96.396,174.112 101.286,140.128" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,39%)"} points="55.317,170.737 57.089,130.092 91.052,140.362" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,44%)"} points="67.317,120.425 57.089,130.092 91.052,140.362" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,35%)"} points="57.089,130.092 67.317,120.425 59.88,95.331" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,38%)"} points="91.052,140.362 70.775,95.55 67.317,120.425" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,46%)"} points="70.775,95.55 59.88,95.331 67.317,120.425" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,41%)"} points="59.88,95.331 75.161,68.456 70.775,95.55" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,45%)"} points="78.442,90.894 70.775,95.55 75.161,68.456" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,39%)"} points="101.286,140.128 91.052,140.362 70.775,95.55" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,32%)"} points="70.775,95.55 78.442,90.894 101.286,140.128" shapeRendering={shapeRendering}/>
            <polyline fill={"hsl(180,60%,47%)"} points="52.177,14.769 61.052,31.112 64.192,13.347" shapeRendering={shapeRendering}/>
            <polygon fill={" hsl(180,60%,64%)"} points="57.958,0.128 52.177,14.769 64.192,13.347" shapeRendering={shapeRendering}/>
        </svg>

);

export default Drop;