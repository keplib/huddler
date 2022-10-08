import type { NextPage } from "next";
import Register from "../src/components/Register";
const LandingPage: NextPage = () => {
  return (
    // <div className="h-screen w-full bg-red-200">
    //   {/* <NavBar /> */}
    // </div>
    <>
      <Register />
      <h1 className='bg-blue-300'>HELLO</h1>
    </>
  );
};

export default LandingPage;

