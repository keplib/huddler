import React, { useEffect, useRef, useState } from 'react';
import UserDetails from './ThirdUserInfo';
import Third from './ThirdPage';
import Interests from './FirstInterests';
import Location from './SecondLocation';
import Router from 'next/router';
import { Category, User } from '../../types';
import UserInfo from './ThirdUserInfo';

function MainForm() {
  const [page, setPage] = useState(1);
  const [imageSelected, setImageSelected] = useState(false);
  const [categoriesPicked, setCategoriesPicked] = useState<Category[]>([])
  const [location, setLocation] = useState()

  const imagesRef = useRef<HTMLInputElement | null>(null);

  const [userData, setUserData] = useState<User>({
    name: '',
    email: '',
    description:'',
  });

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageSelected(true);
    if (e.target.files[0]) {
      setUserData({
        ...(userData as User),
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

 
  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page < 3) {
      setPage(page + 1);
    } else {
      handleSubmit();
    }
  };

  const prevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSubmit = () => {
    console.log(userData);
    console.log('sub');
    setTimeout(() => {
      Router.push('./home');
    }, 5000);
  };

  return (
    <div className='flex items-center flex-col py-3'>
      <h1 className='my-0'>{page}/3</h1>
      <div className='h-[60vh] w-full flex justify-center'>
        {page === 1 && <Interests setCategoriesPicked={setCategoriesPicked} categoriesPicked={categoriesPicked}/>}
        {page === 2 && <Location location={location} setLocation={setLocation} />}
        {page === 3 && (
          <UserInfo
            userData={userData!}
            setUserData={setUserData!}
          />
        )}
        {page === 4 && (
          <Third
            userData={userData!}
            imagesRef={imagesRef}
            onSelectFile={onSelectFile}
            imageSelected={imageSelected}
          />
        )}
      </div>
      <div className='flex gap-10'>
        {page > 1 && (
          <button
            onClick={(e) => prevPage(e)}
            className='px-6 py-2 bg-palette-dark text-white'
          >
            prev
          </button>
        )}
        {page > 2 ? (
          <button
            onClick={(e) => nextPage(e)}
            className='px-6 py-2 bg-palette-darktext-white'
          >
            submit
          </button>
        ) : (
          <button
            onClick={(e) => nextPage(e)}
            className='px-6 py-2 bg-palette-dark text-white'
          >
            next
          </button>
        )}
      </div>
    </div>
  );
}

export default MainForm;
