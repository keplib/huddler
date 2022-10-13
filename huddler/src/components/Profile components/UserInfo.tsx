import React from 'react';
import { User } from '../../../src/types';
import avatar from '../../../public/placeholder.jpg';

type Props = {
  numOfCreatedHuddles: number;
};

function UserInfo({ numOfCreatedHuddles }: Props) {
  const user: User = {
    name: 'Florio',
    image: avatar,
    email: '',
    createdOn: 0,
  };

  return (
    <>
      <h1 className='text-3xl'>My Huddles</h1>
      <br />
      <div className='flex gap-5 justify-center w-full'>
        <div className='flex flex-col justify-center w-[150px] text-2xl border-solid border-[0.5px] border-palette-orange shadow-md rounded-l-[50px] rounded-r-[50px]'>
          <h1 className='self-center'>Created</h1>
          <p className='font-bold self-center'>{numOfCreatedHuddles}</p>
        </div>
        <div className='flex flex-col justify-center  w-[150px] text-2xl border-solid border-[0.5px] border-palette-orange   shadow-md rounded-l-[50px] rounded-r-[50px] '>
          <h1 className='self-center'>Going</h1>
          <p className='font-bold self-center'>6</p>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
