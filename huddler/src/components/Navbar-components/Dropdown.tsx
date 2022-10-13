import React, { useState, useRef, useEffect, EventHandler } from 'react';
import { CgProfile } from "react-icons/Cg"
import { FiSettings } from "react-icons/Fi"
import { HiOutlineLogout } from "react-icons/Hi"
import { AiOutlineCompass } from "react-icons/Ai"

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
      className='mt-24 w-full'
    // onMouseLeave={() => setShowDropDown(false)}
    >
      <ul className='grid grid-cols-3 gap-4 border-b w-64 absolute bg-palette-dark -right-[50%] place-content-center pt-3'>
        {serviceDropdown.map((menuItem, i) => {
          return (
            <Link href={menuItem.path}>
              <a className='col-span-3 border-b p-5 flex gap-4 text-2xl items-center font-bold' key={i}>
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

