import { useEffect, useState } from 'react';
import { categoryTags } from '../../categoryTags';
import { Category } from '../../types';
import { getAllCategories } from '../../utils/APIServices/categoryServices';

// export const getServerSideProps = async () => {
//   const categories = await getAllCategories();
//   const data = Promise.all(categories)
//   return {
//     props: {
//       categories: data,
//     },
//   };
// };

type Props = {
  setCategoriesPicked: React.Dispatch<React.SetStateAction<any>>;
  categoriesPicked: Category[];
};

function Interests({ setCategoriesPicked, categoriesPicked }: Props) {
  const [displayCategories, setDisplayCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const interests = await getAllCategories();
    console.log(interests);
    setDisplayCategories(interests);
    return interests;
  };

  const addCategory = (category: Category) => {
    setCategoriesPicked([...categoriesPicked, category]);
  };
  console.log(categoriesPicked);

  const changeColor = (e: any) => {
    console.log(e.target.className);
    e.target.className = e.target.className + ' bg-orange-600';
  };
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-center text-3xl font-bold'>
          <h1>Welcome new Huddler!</h1>
        </div>

        <div className='flex flex-col py-8'>
          <h1 className='self-center text-2xl'>Choose your interests:</h1>
          <div className='grid grid-cols-4 grid-flow-auto gap-4 py-4 w-full'>
            {displayCategories.map((category: Category, i) => (
              <h1
                className='h-[40px] text-xl bg-palette-orange py-2 px-2 text-center rounded text-white cursor-pointer active:translate-x-[1px] active:translate-y-[1px]'
                key={i}
                onClick={(e) => {
                  addCategory(category);
                  changeColor(e);
                }}
              >
                {category.name}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Interests;
