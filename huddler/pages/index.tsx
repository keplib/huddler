import type { NextPage } from "next";
import Image from "next/future/image";
import Register from "../src/components/Register";
import placeholder from "../public/placeholder.jpg"
const LandingPage: NextPage = () => {

  return (
    <div className="flex w-full h-full justify-center relative">
      <Image alt={"image"} src={placeholder} sizes="100%" priority={true} />
      <Register />
      {/* <h1 className='bg-blue-300'>HELLO</h1> */}
    </div>
  );
};
export default LandingPage;