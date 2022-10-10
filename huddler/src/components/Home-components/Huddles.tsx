import useSWR from 'swr'
import HuddleCard from './HuddleCard';
import { fetcher } from '../../utils/fetcher';

function Huddles() {
    const { data, error } = useSWR('https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
      <div className='flex flex-col gap-4 w-3/4 border border-black m-16'>
        {data.map((post: any) => (
          <HuddleCard item={post} key={post.id}/>
        ))}
      </div>
    )
  }

export default Huddles;

