import useSWR, { Key, Fetcher } from 'swr'


export const fetcher = async (...args) => {
    
    // const url = 'https://jsonplaceholder.typicode.com/posts'
    const res = await (fetch(...args))
    const newdata = await res.json()
    return newdata;
    // const res = await(fetch(url,data))
}