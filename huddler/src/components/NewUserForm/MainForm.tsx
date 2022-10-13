import React, { useEffect, useRef, useState } from 'react';
import UserDetails from './SecondPage';
import Third from './ThirdPage';
import Welcome from './FormWelcomePage';
import LocationTags from './LocationTags';
import Router from 'next/router';
import { Category, User } from '../../types';
import SecondPage from './SecondPage';

function MainForm() {
  const [page, setPage] = useState(0);
  const [imageSelected, setImageSelected] = useState(false);
  const imagesRef = useRef<HTMLInputElement | null>(null);

  const [userData, setUserData] = useState<User | null>(null);

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

  const handleTag = (tag: Category) => {
    const category = [...userData!.categories!, tag];
    setUserData({ ...userData!, categories: category });
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
    <div className='flex items-center flex-col py-8'>
      <h1>{page}/3</h1>
      <div className='h-[60vh] w-full flex justify-center'>
        {page == 0 ? (
          <Welcome />
        ) : page == 1 ? (
          <LocationTags handleTag={handleTag} />
        ) : page == 2 ? (
          <SecondPage
            userData={userData!}
            setUserData={setUserData!}
          />
        ) : (
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
            className='px-6 py-2 bg-blue-500 text-white'
          >
            prev
          </button>
        )}
        {page > 2 ? (
          <button
            onClick={(e) => nextPage(e)}
            className='px-6 py-2 bg-red-500 text-white'
          >
            submit
          </button>
        ) : (
          <button
            onClick={(e) => nextPage(e)}
            className='px-6 py-2 bg-blue-500 text-white'
          >
            next
          </button>
        )}
      </div>
    </div>
  );
}

export default MainForm;
