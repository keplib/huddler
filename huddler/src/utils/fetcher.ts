export const fetcher = async (...args: any) => {
    // const url = 'https://jsonplaceholder.typicode.com/posts'
    const res = await (fetch(...args))
    const newdata = await res.json()
    return newdata;
    // const res = await(fetch(url,data))
}