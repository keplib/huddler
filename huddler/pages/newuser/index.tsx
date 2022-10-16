import React, { useEffect } from 'react';
import MainForm from '../../src/components/NewUserForm/MainForm';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/contexts/AuthContext';

function Index() {
  //@ts-ignore
  const { currentUser } = useAuth();
  
  const router = useRouter();
  if (!currentUser) {
    router.replace('/');
    return;
  }
  console.log('this is currentUSer', currentUser);

  return (
    <div className='flex justify-center '>
      <div className='border-solid border-[1px] border-palette-orange min-w-fit w-[50%] mt-10 px-3 rounded-[5px] shadow-md'>
        <MainForm currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Index;
