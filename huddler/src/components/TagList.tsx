import React, { useEffect, useState } from 'react';
import { Category } from '../types';
import { getAllCategories } from '../utils/APIServices/categoryServices';

type Props = {
  setAllCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};
const TagList = ({ setAllCategories }: Props) => {
  //should compare string in input to categories and display ones that match
  const [comparator, setComparator] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const getter = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };
  useEffect(() => {
    getter();
  }, []);

  //matches input with categories to display
  useEffect(() => {
    setAllCategories([{ id: 0, name: '' }]);
    let arr: Category[] = [];
    categories.forEach((el) => {
      const name = el.name.toLowerCase();
      if (comparator.length < 1) return;
      // Typescript error. It thinks we are trying to assing a different type value with arr.includes
      //@ts-ignore
      if (name.includes(comparator.toLowerCase()) && !arr.includes(el.name)) {
        arr = [...arr, { id: el.id, name: el.name.replace(/\s/g, '') }];
      }
    });
    arr.shift();
    setAllCategories(arr);
  }, [comparator]);
  return (
    <div>
      <input
        placeholder='Add Tags...'
        type='text'
        className='border-solid border-2 border-black-600 w-[100%]'
        onChange={(e) => setComparator(e.target.value)}
      ></input>
    </div>
  );
};

export default TagList;

