import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import Interests from './FirstInterests';
import Location from './SecondLocation';
import UserInfo from './ThirdUserInfo';
import { Category, User } from '../../types';

function MainForm() {
  const [page, setPage] = useState(1);
  const [userImage, setUserImage] = useState();
 
  const [location, setLocation] = useState();

  const [userData, setUserData] = useState<User>({
    name: '',
    email: '',
    description: '',
    image: '',
    categories: [],
    longitude: 0,
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
    setUserData({...userData, longitude: location.lng})
    console.log(userData);
    // console.log('sub');
    // setTimeout(() => {
    //   Router.push('./home');
    // }, 5000);
  };

  return (
    <div className='flex items-center flex-col py-3'>
      <h1 className='my-0'>{page}/3</h1>
      <div className='h-[60vh] w-full flex justify-center'>
        {page === 1 && (
          <Interests
        
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {page === 2 && (
          <Location
            location={location}
            setLocation={setLocation}
          />
        )}
        {page === 3 && (
          <UserInfo
            userData={userData!}
            setUserData={setUserData!}
            setUserImage={setUserImage}
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
            onClick={(e) => nextPage(e)}
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
