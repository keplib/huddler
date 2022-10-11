import React, { useState, useRef, useEffect } from "react";
import Image from "next/future/image";
import placeholder from "../../../public/placeholder.jpg";
import Dropdown from "./Dropdown";
import Search from "../Home-components/Search";

function Navbar() {
  const [showDropDown, setShowDropDown] = useState(false);
  
  const handleClickOnImg = () => {
    setShowDropDown(!showDropDown);
  };
  

  return (
    <div className="h-24 w-full bg-black text-white flex items-center justify-between fixed top-0 px-12 z-10">
      <h1>Logo here</h1>
      {/* <Search /> */}
      <div className="w-24 h-24 relative">
        <Image
          src={placeholder}
          alt="placeholder"
          fill
          className=" rounded-full p-1 cursor-pointer"
          onClick={() => handleClickOnImg()}
        />
        {showDropDown && <Dropdown setShowDropDown={setShowDropDown}/>}
      </div>
    </div>
  );
}

export default Navbar;
