import React from "react";
import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import Search from "../../src/components/Home-components/Search";
import { getAllHuddles, getAllCategories } from "../../src/utils/APIfunctions";

function index() {
  const { data: huddles, error: huddleError } = getAllHuddles();
  const { data: categories, error: catError } = getAllCategories()

  // if (huddleError || catError) return <div>failed to load</div>
  // if (!huddles || !categories) return <div>loading...</div>

  return (
    <>
      {/* <Search categories={categories} /> */}
      <div className="flex">
        <Huddles huddles={huddles} />
        {/* <Map huddles={huddles} /> */}
      </div>
    </>
  );
}

export default index;
