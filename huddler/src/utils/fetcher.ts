export const fetcher = async (...args: any) => {
    // const url = 'https://jsonplaceholder.typicode.com/posts'
    console.log(args);
    const res = await (fetch(...args))
    const newdata = await res.json()
    console.log(newdata);
    return newdata;
    // const res = await(fetch(url,data))
}