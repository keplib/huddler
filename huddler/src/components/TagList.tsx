import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { getAllCategories } from "../utils/APIServices/categoryServices";
import { fetcher } from "../utils/APIServices/fetcher";
type Props = {
  setAllCategories: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
      }[]
    >
  >;
};
const TagList = ({ setAllCategories }: Props) => {
  //should compare string in input to categories and display ones that match
  const [comparator, setComparator] = useState("");
  const [categories, setCategories] = useState<any>([]);
  const getter = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };
  useEffect(() => {
    getter();
  }, []);
  //matches input with categories to display
  useEffect(() => {
    setAllCategories([{ id: 0, name: "" }]);
    let arr = [{}];
    categories.forEach((el: { id: number; name: string }) => {
      const name = el.name.toLowerCase();
      if (comparator.length < 1) return;
      if (name.includes(comparator.toLowerCase()) && !arr.includes(el.name)) {
        arr = [...arr, { id: el.id, name: el.name.replace(/\s/g, "") }];
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
