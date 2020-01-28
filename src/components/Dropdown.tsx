import React, {ReactNode, useState} from "react";

function DropDown(props: { name: string, children: ReactNode, className?: string }) {

  const [expanded, setExpanded] = useState(false);
  return (<React.Fragment>
    <div className={(props.className ? props.className + " " : "") + "pb-1"}>
      <p className={"cursor-pointer "} onClick={() => setExpanded(!expanded)}>{props.name}</p>
    </div>
    <div className={"fixed block bg-white mr-4  md:right-0 left-auto sm:inset-x-0 md:inset-auto" + (expanded ? "" : " hidden")}>
      {props.children}
    </div>
  </React.Fragment>);
}

export function DropDownItem(props: { children: ReactNode, className?: string }) {
  return <div className={(props.className ? props.className + " " : "") + "text-gray-800 px-6 py-2"}>
    {props.children}
  </div>
}

export function DropDownSpacer() {
  return <div className={"border-black-300 border-b"}/>
}

export default DropDown;
