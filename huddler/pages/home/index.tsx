import React, { useEffect, useState } from "react";

import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import { getAllHuddles } from "../../src/utils/APIServices/huddleServices";
import {
  fetcher,
  getSession,
  recommendedForUser,
} from "../../src/utils/helperFunctions";
import { Huddle } from "../../src/types";
// import HuddleCarousel from "../../src/components/Profile components/HuddleCarousel";
import HuddlesNew from "../../src/components/Home-components/HuddlesNew";
import NewHuddleCard from "../../src/components/Home-components/NewHuddleCard";
import useSWR from "swr";
import { AiOutlineArrowUp } from "react-icons/ai";
import MobileMap from "../../src/components/Home-components/MobileMap";
import { useAuth } from "../../src/contexts/AuthContext";
import { Auth, withSSRContext } from "aws-amplify";

type Props = {
  recommended: Huddle[];
  huddlesUserIsGoing: Huddle[];
};

function Home({ recommended }: Props) {
  const { currentUser } = useAuth();
  const [filterChoice, setFilterChoice] = useState<Huddle[]>(recommended); //by default recommended
  const { data: userCreatedHuddles, error: userHuddleError } = useSWR(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_created?user-id=${currentUser}`,
    fetcher
  );

  const getter = async () => {
    const data = await getAllHuddles();
    setFilterChoice(data);
  };
  const [update, setUpdate] = useState(false);
  const [mobileShowMap, setMobileShowMap] = useState(false);
  const [huddlesUserIsGoing, setHuddlesUserIsGoing] = useState<Huddle[]>();
  useEffect(() => {
    getter();
    console.log("no loop pls");
  }, [update]);
  // if user uses another filter let's call a function that does it.
  if (userHuddleError) return <div>failed to load</div>;
  if (!userCreatedHuddles || !recommended) return <div>loading...</div>;

  return (
    <div className="sm:block md:flex xl:gap-10 mt-6 relative h-full md:px-24 lg:px-1 2xl:px-5">
      <div className="max-h-[87vh] overflow-y-auto w-full" id="carousel">
        <div className="flex p-5 mb-2 shadow-md justify-around md:justify-start">
          <button
            className="mr-4"
            onClick={(e) => setFilterChoice(recommended)}
          >
            Recommended
          </button>
          <button onClick={(e) => getter()}>All Huddles</button>
          <button
            onClick={() => setMobileShowMap(!mobileShowMap)}
            className="lg:hidden"
          >
            {mobileShowMap ? (
              <AiOutlineArrowUp />
            ) : (
              <AiOutlineArrowUp className=" rotate-180" />
            )}{" "}
          </button>
        </div>

        {/* <Huddles huddles={filterChoice} /> */}
        {mobileShowMap && (
          <div className="absolute lg:hidden block h-full w-full z-30">
            <MobileMap huddles={filterChoice} />
          </div>
        )}

        <HuddlesNew
          huddles={filterChoice}
          update={update}
          huddlesUserIsGoing={huddlesUserIsGoing}
        />
      </div>

      <div className="mt-16 hidden lg:flex ">
        <Map huddles={filterChoice} update={update} />
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);

  try {
    const huddles: Huddle[] = await fetcher(
      "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted"
    );
    const { username } = await Auth.currentUserInfo();
    const recommended: Huddle[] = await recommendedForUser(username);
    return {
      props: {
        authenticated: true,
        username,
        recommended,
        huddles,
      },
    };
  } catch (err) {
    return {
      props: {
        authenticated: false,
        recommended: [],
        huddles: [],
      },
    };
  }
};
