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
      <div className='flex flex-col gap-4 w-3/4 border border-black m-16'>
        {data.map((post: any) => (
          <HuddleCard item={post.title} key={post.id} />
        ))}
      </div>
    )
  }

export default Huddles;

