import React, { useEffect } from 'react';
import MainForm from '../../src/components/NewUserForm/MainForm';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/contexts/AuthContext';

function Index() {
  //@ts-ignore
  const { currentUser, logOut, isAuthenticated } = useAuth();
  const router = useRouter();
  // if (!isAuthenticated()) {
  //   // router.replace('/');
  //   return
  // }
  console.log('current', currentUser);
  console.log('current', currentUser)
  console.log('logOut', logOut);


  return (
    <div className='flex justify-center '>
      <div className='border-solid border-[1px] border-palette-orange min-w-fit w-[50%] mt-10 px-3 rounded-[5px] shadow-md'>
        <MainForm currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Index;
