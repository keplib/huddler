import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../src/utils/fetcher";
type Props = {
  setAllCategories: React.Dispatch<React.SetStateAction<string[]>>;
};
const TagList = ({ setAllCategories }: Props) => {
  //should compare string in input to categories and display ones that match
  const { data: categories, error: catError } = useSWRImmutable(
    "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/get-all-categories",
    fetcher
  );
  const [comparator, setComparator] = useState("");
  //matches input with categories to display
  useEffect(() => {
    setAllCategories([""]);
    let arr = [""];
    categories.forEach((el: { id: number; name: string }) => {
      const name = el.name.toLowerCase();
      if (comparator.length < 1) return;
      if (name.includes(comparator.toLowerCase()) && !arr.includes(el.name)) {
        arr = [...arr, el.name.replace(/\s/g, "")];
      }
    });
    arr.shift();
    setAllCategories(arr);
  }, [comparator]);
  return (
    <div>
      <input
        placeholder="Add Tags..."
        type="text"
        className="border-solid border-2 border-black-600 w-[100%]"
        onChange={(e) => setComparator(e.target.value)}
      ></input>
    </div>
  );
};

export default TagList;
