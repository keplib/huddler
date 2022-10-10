import useSWR from 'swr'
import HuddleCard from './HuddleCard';
import { fetcher } from '../../utils/fetcher';
import { useState } from 'react';
import { Huddle } from '../../types';

function Huddles() {
  const [active, setActive] = useState({})
  const { data, error } = useSWR('https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted', fetcher);
  const handleActive = (huddle:Huddle) => {
    if (active === huddle) {
      setActive({})
    } else {
      setActive(huddle);
    }
  }

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
      <div className='flex flex-col gap-4 w-3/4 border border-black m-16'>
        {data.map((huddle: any) => (
          <HuddleCard item={huddle} key={huddle.id} active={active} handleActive={handleActive} />
        ))}
      </div>
    )
  }

export default Huddles;

