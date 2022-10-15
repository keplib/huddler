import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import Interests from './FirstInterests';
import Location from './SecondLocation';
import UserInfo from './ThirdUserInfo';
import { Category, User } from '../../types';
import { postUserInfo, postUserCategy } from '../../utils/APIServices/userServices';

function MainForm() {
  const [page, setPage] = useState(1);
  const [userImage, setUserImage] = useState();

  const [location, setLocation] = useState({ name: '', lat: 0, lng: 0 });
  const [categoriesPicked, setCategoriesPicked] = useState<Category[]>([]);
  const [userData, setUserData] = useState<User>({
    username: '',
    first_name: '',
    last_name: '',
    image: '',
    default_longitude: 0,
    default_latitude: 0,
    description: '',
  });

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
    console.log('hereeeeee');
    console.log(userData);

    console.log(categoriesPicked);
    postUserInfo(userData, 179);
    //posting the categories to new huddle
    categoriesPicked.forEach((category) => {
      postUserCategory(179, category.id as number);
    });
    Router.replace('./home');
  };

  return (
    <div className='flex items-center flex-col py-3'>
      <h1 className='my-0'>{page}/3</h1>
      <div className='h-[60vh] w-full flex justify-center'>
        {page === 1 && (
          <Interests
            categoriesPicked={categoriesPicked}
            setCategoriesPicked={setCategoriesPicked}
          />
        )}
        {page === 2 && (
          <Location
            location={location}
            setLocation={setLocation}
            setUserData={setUserData}
            userData={userData}
          />
        )}
        {page === 3 && (
          <UserInfo
            userData={userData!}
            setUserData={setUserData!}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      <div className='flex gap-10'>
        {page > 1 && (
          <button
            onClick={(e) => prevPage(e)}
            className='px-6 py-2 bg-palette-dark text-white'
          >
            Previous
          </button>
        )}
        {page > 2 ? (
          <button
            onClick={(e) => {
              nextPage(e);
              handleSubmit();
            }}
            className='px-6 py-2 bg-palette-dark text-white'
          >
            Submit
          </button>
        ) : (
          <button
            onClick={(e) => nextPage(e)}
            className='px-6 py-2 bg-palette-dark text-white'
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default MainForm;
function postuserCategories(arg0: number, arg1: number) {
  throw new Error('Function not implemented.');
}

