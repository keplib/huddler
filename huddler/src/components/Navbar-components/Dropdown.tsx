import React, { useState, useRef, useEffect, EventHandler } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
const serviceDropdown = [
  { name: 'Explore', path: '/home' },
  { name: 'Profile', path: '/profile' },
  { name: 'Settings', path: '/settings' },
  { name: 'Log Out', path: '/' },
];

type Props = {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>; 
}
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
  };

  return (
    <div
      ref={insideDropDownRef}
      className='mt-24 w-full'
      // onMouseLeave={() => setShowDropDown(false)}
    >
      <ul className='grid grid-cols-3 gap-4 border-b w-48 absolute bg-black -right-[50%] place-content-center pt-2 text-lg'>
        {serviceDropdown.map((menuItem, i) => {
          return (
            <li
              className='col-span-3 border-b p-4'
              key={i}
            >
              {menuItem.name === 'Log Out' ? (
                <Link href=''>
                  <a onClick={(e) => handleLogoutClick(e)}>{menuItem.name}</a>
                </Link>
              ) : (
                <Link href={menuItem.path}>{menuItem.name}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;





