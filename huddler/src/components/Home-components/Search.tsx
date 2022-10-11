import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

function Search() {
  const { data, error } = useSWR("https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/get-all-categories", fetcher);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (data) handleSearch();
  }, [search])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const handleShow = () => {
    setShow(!show);
  }

  const handleSearch = () => {
    let filtered = data.filter(element => {
      return element.name.toLowerCase().includes(search.toLocaleLowerCase());      
    });
    return filtered;
  }


  return (
    <div className="w-full bg-yellow-200 justify-center items-center flex flex-col">
      <div className="pt-12"></div>

      <form className="py-6">
        <input
          value ={search}
          className="h-8 w-[24rem] text-slate-700 p-1 self-center"
          placeholder="Look for Huddles . . ."
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        {/* <select>
          {data.map((tag) => (
            <option>{tag.name}</option>
          ))}
        </select> */}
      </form>


      <button onClick={() => handleShow()}>{show ? "Up" : "Down"}</button>
      {show && <div className='flex flex-wrap bg-white gap-4 p-4 border'>
        {data && handleSearch().map((tag) => (
          <h1 className='text-xl bg-blue-600 py-2 px-3 rounded text-white hover:scale-150 hover:mx-4 cursor-pointer'
            key={tag.id}>{tag.name}</h1>
        ))}
      </div>}


    </div>
  );
}

export default Search;
