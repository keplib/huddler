import React, { useState } from 'react';
import Image from 'next/future/image';
import placeholder from '../../../public/placeholder.jpg';
import Dropdown from './Dropdown';
import Link from 'next/link';

function Navbar() {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleClickOnImg = () => {
    console.log('click' ,showDropDown)
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="h-24 w-full bg-palette-dark text-white flex items-center justify-between fixed top-0 px-12 z-10 border-b border-palette-orange">
      <Link href={'/home'}><a>Logo here</a></Link>
      <div className="w-24 h-24 relative">
        <Image
          src={placeholder}
          alt='placeholder'
          fill
          className=' rounded-full p-1 cursor-pointer'
          onClick={() => handleClickOnImg()}
        />
        {showDropDown && <Dropdown setShowDropDown={setShowDropDown} />}
      </div>
    </div>
  );
}

export default Navbar;
