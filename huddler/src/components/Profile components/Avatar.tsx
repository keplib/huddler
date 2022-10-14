import React from 'react';
import avatar from '../../../public/placeholder.jpg';
import Image from 'next/future/image';
import { User } from '../../../src/types';

const user: User = {
  name: 'Florio',
  image: avatar,
  email: '',
  createdOn: 0,
};

function Avatar() {
  return (
    <div className='w-full flex flex-col py-8 justify-center'>
      <h1 className='text-[2rem] self-center'>
        Welcome back, {user.name}
      </h1>
    <br/>
      <div className='rounded-full self-center shadow-md w-72 h-72 2xl:w-96 2xl:h-96 relative'>
        <Image
          className='rounded-full'
          src={user.image! as string}
          placeholder='empty'
          alt='avatar'
          sizes='auto'
          priority={true}
          fill
        />
      </div>
    </div>
  );
}

export default Avatar;
