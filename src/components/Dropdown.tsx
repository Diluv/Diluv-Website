import React, { ReactNode, useEffect, useRef } from 'react';
import Link from 'next/link';
import useComponentVisible from '../utils/hooks';
import { usePopper } from "react-popper";


function DropDown(props: { name: string, children: ReactNode, className?: string }) {

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  }: {
    ref: React.Ref<any>,
    isComponentVisible: boolean,
    setIsComponentVisible: Function
  } = useComponentVisible(false);

  const popperRef = useRef(null);
  const { styles, attributes, update } = usePopper(
    ref.current,
    popperRef.current,
    {
      placement: "bottom-end",
      modifiers: []
    }
  );

  const { name, children, className } = props;
  return (
    <>
      <div ref={ref}>
        <div className={`${className || ''} cursor-pointer`} onClick={() => {
          setIsComponentVisible(!isComponentVisible);
          // This is needed to make sure it stays in the right position...
          if (update) {
            update().then(() => {
            });
          }
        }}>
          <span className={`select-none`}>{name}</span>
        </div>
        <div ref={popperRef} style={styles.popper} {...attributes.popper}>
          <div className={`border border-gray-800 bg-gray-300 transition-all duration 150 ease-in-out ${isComponentVisible ? '' : 'hidden'}`}
               style={styles.offset}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export function DropDownItem(props: { children: ReactNode, className?: string }) {
  const { children, className } = props;
  return (
    <div className={`${className || ''} text-gray-800 px-6 py-2`}>
      {children}
    </div>
  );
}

export function DropDownLink(props: { children: ReactNode, className?: string, href: string }) {
  const { href, children, className } = props;
  return (
    <Link href={href}>
      <a
        className={`${className || ''} text-gray-800 px-6 py-2 hover:bg-gray-400 transition-colors duration-150 ease-in cursor-pointer block`}
      >
        {children}
      </a>
    </Link>
  );
}

export function DropDownAction(props: {
  children: ReactNode,
  className?: string,
  action: Function
}) {
  const { children, action, className } = props;
  return (
    <div onClick={(e) => action(e)}>
      <div
        className={`${className || ''} text-gray-800 px-6 py-2 cursor-pointer select-none hover:bg-gray-400  transition-colors duration-150 ease-in`}
      >
        {children}
      </div>
    </div>
  );
}

export function DropDownSpacer() {
  return <div className="border-gray-400 border-b"/>;
}

export default DropDown;
