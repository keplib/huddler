import React from "react";
import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import Search from "../../src/components/Home-components/Search";
import { getUserCategories } from "../../src/utils/APIServices/userServices";
<<<<<<< HEAD
import { getHuddlesInCategory } from "../../src/utils/APIServices/categoryServices";
import { useState } from "react";
import { User } from "../../src/types";
=======
import {
  getHuddlesInCategory,
  getAllCategories,
} from "../../src/utils/APIServices/categoryServices";
import { useState } from "react";
import { User } from "../../src/types";
import { getAllHuddles } from "../../src/utils/APIServices/huddleServices";
>>>>>>> dev

function index() {
  // get current User from auth

  const [currentUser, setCurrentUser] = useState(); //Pass it the user given by Auth

  const { data: huddles, error: huddleError } = getAllHuddles();
  const { data: categories, error: catError } = getAllCategories();

  // const { data: userCategories, error: error } = getUserCategories();

  // const { data: huddlesInCategory, error: error } = getHuddlesInCategory();

  if (userCategoriesError || error) return <div>failed to load</div>;
  if (!huddles || !categories) return <div>loading...</div>;

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
