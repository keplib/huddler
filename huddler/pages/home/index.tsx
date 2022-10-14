import React, { useState } from "react";

import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import { getAllHuddles } from "../../src/utils/APIServices/huddleServices";
import { recommendedForUser } from "../../src/utils/helperFunctions";
import { Huddle } from "../../src/types";
import HuddleCarousel from "../../src/components/Profile components/HuddleCarousel";

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

    <div className="sm:block md:flex gap-10 mr-0 mt-10 relative">

      <div className="max-h-[80vh] overflow-scroll w-full">
        <div className="flex p-5 mb-2 shadow-md pl-10">
          <button
            className="mr-4"
            onClick={(e) => setFilterChoice(recommended)} >
            Recommended
          </button>
          <button onClick={(e) => getter()}>All Huddles</button>
        </div>

        {/* <Huddles huddles={filterChoice} /> */}
        <HuddleCarousel huddles={filterChoice} />
      </div>

      <div className="">
        <Map huddles={filterChoice} />
      </div>
    </div>

  );
}

export default Home;
