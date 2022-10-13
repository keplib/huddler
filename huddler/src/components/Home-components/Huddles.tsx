import useSWR from 'swr';
import HuddleCard from './HuddleCard';
import { fetcher } from '../../utils/APIServices/fetcher';
import { useState } from 'react';
import { Huddle } from '../../types';


function Huddles({huddles}) {
  const [active, setActive] = useState({});
  const handleActive = (huddle: Huddle) => {
    if (active === huddle) {
      setActive({});
    } else {
      setActive(huddle);
    }
  };
 
  return (
    <div className='flex flex-col gap-4 w-3/4 border border-black m-16'>
      {huddles.map((huddle: any) => (
        <HuddleCard
          item={huddle}
          key={huddle.id}
          active={active}
          handleActive={handleActive}
        />
      ))}
    </div>
  );
}

export default Huddles;




