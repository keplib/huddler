import React from "react";
import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import useSWR from 'swr'
import { fetcher } from "../../src/utils/fetcher";
import Search from "../../src/components/Home-components/Search";
// import { Huddle } from '../../types';

function index() {
  const { data: huddles, error: huddleError } = useSWR('https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted', fetcher)
  const { data: categories, error: catError } = useSWR('https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/get-all-categories', fetcher)

  if (huddleError || catError) return <div>failed to load</div>
  if (!huddles || !categories) return <div>loading...</div>

  return (
    <>
      <Search categories={categories} />
      <div className="flex">
        <Huddles huddles={huddles} />
        <Map huddles={huddles} />
      </div>
    </>
  );
}

export default index;
