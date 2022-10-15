import React from 'react';
import MainForm from '../../src/components/NewUserForm/MainForm';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify'

let aws_id = '';

Auth.currentAuthenticatedUser()
  .then((user) => {
    console.log('User: ', user);
    aws_id = user.username;
    console.log('this is aws', aws_id);
  })
  .catch((err) => console.log(err));

function Index() {
  const router = useRouter();
  //redirect if not authenticated
  if (!aws_id) router.push('/');
  return (
    <div className='flex justify-center '>
      <div className='border-solid border-[1px] border-palette-orange min-w-fit w-[50%] mt-10 px-3 rounded-[5px] shadow-md'>
        <MainForm />
      </div>
    </div>
  );
}

export default Index;
