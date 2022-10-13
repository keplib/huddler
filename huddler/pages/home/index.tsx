import React from 'react';
import Huddles from '../../src/components/Home-components/Huddles';
import Map from '../../src/components/Home-components/Map';
import Search from '../../src/components/Home-components/Search';
import { useState } from 'react';
import { recommendedForUser } from '../../src/utils/helperFunctions';

// we'll need the current user authenticated info
export const getServerSideProps = async () => {
  const data = await recommendedForUser(67); // put user current user id
  return {
    props: {
      recommended: data,
    },
  };
};
function index({recommended}) {
  const [filter, setFilter] = useState(recommended); //by default recommended
  // if user uses another filter let's call a function that does it.
  return (
    <>
      {/* <Search categories={categories} /> */}
      <div className='flex'>
        <Huddles huddles={filter} />
        {/* <Map huddles={filter} /> */}
      </div>
    </>
  );
}

export default index;



