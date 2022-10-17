import React, { useState, useRef, useEffect, EventHandler } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { AiOutlineCompass } from 'react-icons/ai';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
const serviceDropdown = [
  { name: 'Explore', path: '/home', icon: <AiOutlineCompass /> },
  { name: 'Profile', path: '/profile', icon: <CgProfile /> },
  { name: 'Settings', path: '/settings', icon: <FiSettings /> },
  { name: 'Log Out', path: '/', icon: <HiOutlineLogout /> },
];

const defaultClass =
  'border-b px-5  flex gap-10 hover:bg-palette-orange py-2 text-2xl items-center';
const topClass = defaultClass + ' rounded-t-[10px]';
const bottomClass = defaultClass + ' rounded-b-[10px]';

type Props = {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown = ({ setShowDropDown }: Props) => {
  //@ts-ignore
  const { currentUser, logOut } = useAuth();
  console.log('logouuut', currentUser);
  const router = useRouter();
  const insideDropDownRef = useRef<HTMLInputElement>(null);

  const handleLogoutClick = () => {
    console.log('hit hereeee');
    // if (currentUser) return logOut();
    // router.replace('/');
    return;
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
            <div key={i}>
              {i === serviceDropdown.length - 1 ? (
                <button
                  className={
                    i === 0 ? topClass : i === 3 ? bottomClass : defaultClass
                  }
                  // onClick={handle}
                >
                  <p
                    className='text-3xl'
                  >
                    {menuItem.icon}
                  </p>
                  <p>{menuItem.name}</p>
                </button>
              ) : (
                <Link href={menuItem.path}>
                  <a
                    className={
                      i === 0 ? topClass : i === 3 ? bottomClass : defaultClass
                    }
                    // onClick={i === serviceDropdown.length - 1 && handleLogoutClick}
                  >
                    <p className='text-3xl'>{menuItem.icon}</p>
                    <p>{menuItem.name}</p>
                  </a>
                </Link>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;



