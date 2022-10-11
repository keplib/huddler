import React, { useState } from "react";

const TagList = () => {
  //should compare string in input to categories and display ones that match
  const [comparator, setComparator] = useState("");

  return (
    <div>
      TagList
      <input
        type="text"
        className="border-solid border-2 border-black-600 w-[100%]"
        onChange={(e) => setComparator(e.target.value)}
      ></input>
    </div>
  );
};

export default TagList;
