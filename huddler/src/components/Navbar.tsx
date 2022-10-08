import React from "react";
import Image from 'next/future/image'
import placeholder from "../../public/placeholder.jpg"


function Navbar() {


    const handleClick = () => {
        console.log("click");
    }

    return (
        <div className="h-24 w-full bg-black text-white flex items-center justify-between fixed top-0 px-12">
            <h1>
                Logo here
            </h1>

            <div className="w-24 h-24 relative">
                <Image src={placeholder} alt="placeholder" fill className=" rounded-full p-1  cursor-pointer" onClick={() => handleClick()} />
                <div className="mt-24 w-full">
                    <ul className="grid grid-cols-3 gap-4 border-b w-48 absolute bg-black -right-[50%] place-content-center pt-2 text-lg">
                        <li className="col-span-3 border-b p-4">Profile</li>
                        <li className="col-span-3 border-b p-4">Settings</li>
                        <li className="col-span-3 border-b p-4">Create</li>
                        <li className="col-span-3 border-b p-4">About</li>
                        <li className="col-span-3 border-b p-4">Logout</li>
                    </ul>
                </div>

            </div>





        </div>
    );
}

export default Navbar;
