import useSWR from 'swr'
import HuddleCard from './HuddleCard';
// import fetcher from '../util/fetcher'

const fetcher = async (url: string, data: any = undefined) => {
  
  const res = await(fetch(url))
  const newdata = await res.json()

  return newdata;

}

  function Huddles() {
    const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
      <div className='flex flex-col gap-4'>
        {data.map((post: any) => (
          <HuddleCard item={post.title} />
        ))}
      </div>
    )
  }

export default Huddles;

