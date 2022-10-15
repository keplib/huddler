import { useEffect, useState } from 'react';
import { Category, User } from '../../types';
import CategoriesContainer from '../CategoriesContainer';

type Props = {
  categoriesPicked: Category[];
  setCategoriesPicked: React.Dispatch<React.SetStateAction<Category[]>>;
};

function Interests({ categoriesPicked, setCategoriesPicked }: Props) {
  console.log(categoriesPicked);
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-center text-3xl font-bold'>
          <h1>Welcome new Huddler!</h1>
        </div>

        <div className='flex flex-col py-8'>
          <h1 className='self-center text-2xl'>Choose your interests:</h1>
          <CategoriesContainer
            categoriesPicked={categoriesPicked}
            setCategoriesPicked={setCategoriesPicked}
          />
        </div>
      </div>
    </>
  );
}

export default Interests;
