import React from "react";
import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";
import useSWR from 'swr'
import { fetcher } from "../../src/utils/fetcher";
// import { Huddle } from '../../types';

function index() {
  const { data, error } = useSWR('https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted', fetcher)

  return (
    <div className="flex">
      <Huddles />
      <Map huddles={data} />
    </div>
  );
}

export default index;
