import React, { useState, useRef, useEffect, EventHandler } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { AiOutlineCompass } from 'react-icons/ai';

import Link from 'next/link';
import { useRouter } from 'next/router';
const serviceDropdown = [
  { name: 'Explore', path: '/home', icon: <AiOutlineCompass /> },
  { name: 'Profile', path: '/profile', icon: <CgProfile /> },
  { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  { name: 'Log Out', path: '/', icon: <HiOutlineLogout /> },
];

type Props = {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown = ({ setShowDropDown }: Props) => {
const defaultClass =
  'border-b px-5  flex gap-10 hover:bg-palette-orange py-2 text-2xl items-center';
const topClass = defaultClass + ' rounded-t-[10px]';
const bottomClass = defaultClass + ' rounded-b-[10px]';

  const router = useRouter();
  const insideDropDownRef = useRef<HTMLInputElement>(null);

  const handleLogoutClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // some function from authentication logout
    console.log('hit hereeee');
    router.replace('/');
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideDropdown, true);
  }, []);

  function handleClickOutsideDropdown(this: HTMLElement) {
    if (insideDropDownRef.current === null) return;
    if (!insideDropDownRef.current!.contains(this)) setShowDropDown(false);
  }

  return (
    <div
      ref={insideDropDownRef}
      className='mt-24 w-full rounded-[5px] shadow-md'
      // onMouseLeave={() => setShowDropDown(false)}
    >
      <ul className=' w-64 absolute bg-palette-dark -right-[50%] rounded-[10px] mr-[5px] mt-[5px] pt-0'>
        {serviceDropdown.map((menuItem, i) => {
          return (
            <Link
              href={menuItem.path}
              key={i}
            >
              <a className={i === 0 ? topClass : i=== 3 ? bottomClass : defaultClass}>
                <p className='text-3xl'>{menuItem.icon}</p>
                <p>{menuItem.name}</p>
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;






