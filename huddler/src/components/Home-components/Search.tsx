import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { Category } from "../../types";



function Search({ categories }:Category[] ) {
  const [tags, setTags] = useState([])
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('')

  useEffect(() => {
    setTags(categories);
  },[])

  useEffect(() => {
    if (tags) handleSearch();
  }, [search])

  const handleShow = () => {
    setShow(!show);
  }

  const handleSearch = () => {
    let filtered = tags.filter((category:Category) => {
      return category.name.toLowerCase().includes(search.toLocaleLowerCase());      
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
      {show ? <div className='flex flex-wrap bg-white gap-4 p-4 border'>
        
        {tags && handleSearch().map((category:Category) => (
          <h1 className='text-xl bg-blue-600 py-2 px-3 rounded text-white hover:scale-150 hover:mx-4 cursor-pointer'
            key={category.id}>{category.name}</h1>
        ))}
      </div>:<div className="h-20"></div>}


    </div>
  );
}

export default Search;
