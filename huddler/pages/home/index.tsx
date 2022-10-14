import React, { useState } from "react";

import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import { getAllHuddles } from "../../src/utils/APIServices/huddleServices";
import { recommendedForUser } from "../../src/utils/helperFunctions";
import { Huddle } from "../../src/types";
// import HuddleCarousel from "../../src/components/Profile components/HuddleCarousel";
import HuddlesNew from "../../src/components/Home-components/HuddlesNew";

// we'll need the current user authenticated info
export const getServerSideProps = async () => {
  const data = await recommendedForUser(67); // put user current user id
  return {
    props: {
      recommended: data,
    },
  };
};

type Props = {
  recommended: Huddle[];
};

function Home({ recommended }: Props) {
  const [filterChoice, setFilterChoice] = useState<Huddle[]>(recommended); //by default recommended
  const getter = async () => {
    const data = await getAllHuddles();
    setFilterChoice(data);
  };
  // if user uses another filter let's call a function that does it.
  return (

    <div className="sm:block md:flex xl:gap-10 mt-10 relative h-full md:px-24 lg:px-1 2xl:px-5">
      <div className="max-h-[87vh] overflow-y-auto w-full" id="carousel">
        <div className="flex p-5 mb-2 shadow-md">
          <button
            className="mr-4"
            onClick={(e) => setFilterChoice(recommended)} >
            Recommended
          </button>
          <button onClick={(e) => getter()}>All Huddles</button>
        </div>

        {/* <Huddles huddles={filterChoice} /> */}
        <HuddlesNew huddles={filterChoice} />
      </div>

      <div className="mt-16 hidden lg:flex ">
        <Map huddles={filterChoice} />
      </div>
    </div>

  );
}

export default Home;
