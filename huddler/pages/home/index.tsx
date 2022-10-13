import React, {useState} from 'react';

import Huddles from '../../src/components/Home-components/Huddles';
import Map from '../../src/components/Home-components/Map';

import { recommendedForUser } from '../../src/utils/helperFunctions';
import { Huddle } from '../../src/types';

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
  // if user uses another filter let's call a function that does it.
  return (
    <>
      {/* <Search categories={categories} /> */}
      <div className='flex space-x-0'>
        <Huddles huddles={filterChoice} />
        <Map huddles={filterChoice} />
      </div>
    </>
  );
}

export default Home;

