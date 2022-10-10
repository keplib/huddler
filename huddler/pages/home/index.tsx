import React from "react";
import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import useSWR from 'swr'
import { fetcher } from "../../src/utils/fetcher";
// import { Huddle } from '../../types';

function index() {
  const { data, error } = useSWR('https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="flex">
      <Huddles huddles={data} />
      <Map huddles={data} />
    </div>
  );
}

export default index;
