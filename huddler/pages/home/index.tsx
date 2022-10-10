import React from "react";
import Huddles from "../../src/components/Home-components/Huddles";
import Map from "../../src/components/Home-components/Map";

function index() {
  return (
    <div className="flex">
      <Huddles />
      <Map />
    </div>
  );
}

export default index;
