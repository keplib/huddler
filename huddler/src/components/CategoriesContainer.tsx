import { useEffect, useState } from 'react';
import { Category } from '../types';
import { getAllCategories } from '../utils/APIServices/categoryServices';
import { getUserCategories } from '../utils/APIServices/userServices';
import { sortByName } from '../utils/helperFunctions';

type Props = {
  categoriesPicked?: any;
  setCategoriesPicked?: any;
  userCategories?: any;
  setUserCategories?: any;
};

const CategoriesContainer = ({
  categoriesPicked,
  setCategoriesPicked,
  userCategories,
  setUserCategories,
}: Props) => {
  const notSelectedClass =
    'h-[40px] text-xl py-2 px-2 text-center rounded text-white cursor-pointer active:translate-x-[1px] active:translate-y-[1px] bg-palette-orange';
  const selectedClass = notSelectedClass + ' bg-orange-600';

  const [displayCategories, setDisplayCategories] = useState<Category[]>([]);

  // TODO Change initial interests for those that he picks in the initial form, or those that he already have and wants to change in settings
  const interests = categoriesPicked || userCategories || [];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categories = await getAllCategories();
    setDisplayCategories(sortByName(categories));
    return categories;
  };

  const handleClick = (e: any, category: Category) => {
    if (e.target.dataset.selected === 'false') {
      e.target.className = selectedClass;
      interests.push(category);
      e.target.dataset.selected = 'true';
    } else {
      e.target.className = notSelectedClass;
      interests.splice(interests.indexOf(category), 1);
      e.target.dataset.selected = 'false';
    }
    categoriesPicked
      ? setCategoriesPicked(interests)
      : setUserCategories(interests);
    console.log('these are userCategories', userCategories);
    console.log('these are CategoriesPicked', categoriesPicked);
    return;
  };

  return (
    <div className='grid grid-cols-4 grid-flow-auto gap-4 py-4 w-full'>
      {displayCategories.map((category: Category, i) => (
        <h1
          className={
            categoriesPicked
              ? notSelectedClass
              : userCategories.some((cat) => cat.name === category.name)
              ? selectedClass
              : notSelectedClass
          }
          key={i}
          data-selected={
            categoriesPicked
              ? 'false'
              : userCategories.some((cat) => cat.name === category.name)
              ? 'true'
              : 'false'
          }
          onClick={(e) => {
            handleClick(e, category);
          }}
        >
          {category.name}
        </h1>
      ))}
    </div>
  );
};

export default CategoriesContainer;






