import React, { useState } from "react";

import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import { getAllHuddles } from "../../src/utils/APIServices/huddleServices";
import { recommendedForUser } from "../../src/utils/helperFunctions";
import { Huddle } from "../../src/types";

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
    <>
      {/* <Search categories={categories} /> */}
      <div className="sm:block md:flex  space-x-0 mt-14  mr-0">
        <div>
          <div className="flex p-5 mb-2 shadow-md pl-10">
            <button
              className="mr-4"
              onClick={(e) => setFilterChoice(recommended)}
            >
              Recommended
            </button>
            <button onClick={(e) => getter()}>All Huddles</button>
          </div>
          <Huddles huddles={filterChoice} />
        </div>
        <Map huddles={filterChoice} />
      </div>
    </>
  );
}

export default Home;
