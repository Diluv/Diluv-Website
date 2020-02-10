import React, {ReactNode} from "react";
import {useComponentVisible} from "../utils/hooks";

function Modal(props: { children: ReactNode, className?: string }) {

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  }: { ref: React.Ref<any>, isComponentVisible: boolean, setIsComponentVisible: Function } = useComponentVisible(true);

  return (
    <div ref={ref} className={"fixed top-0 left-0 w-full h-full z-50 overflow-auto bg-darken-800 flex" + (isComponentVisible ? "" : " hidden")}>
      <div className={"w-1/2 mx-auto my-auto"}>
        <div className={"bg-white rounded"}>
          <div className={"flex flex-col"}>
            <div className={"border border-b border-red-200 p-4"}>
              Header
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;