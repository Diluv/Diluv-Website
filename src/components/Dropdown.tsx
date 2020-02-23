import React, { ReactNode } from 'react';
import Link from 'next/link';
import useComponentVisible from '../utils/hooks';

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

  const { name, children, className } = props;
  return (
    <div ref={ref}>
      <div
        className={`${className || ''} pb-1 cursor-pointer`}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        <p>{name}</p>
      </div>
      <div
        className={
          `absolute bg-white mr-4 border border-gray-800 md:right-0 left-auto sm:inset-x-0 md:inset-auto bg-gray-300 
          ${isComponentVisible ? '' : 'opacity-0 hidden'}`
        }
      >
        {children}
      </div>
    </div>
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
        className={`${className || ''} text-gray-800 px-6 py-2 cursor-pointer hover:bg-gray-400  transition-colors duration-150 ease-in`}
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
