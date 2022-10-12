import React from 'react'
import avatar from '../../../public/placeholder.jpg';
import Image from 'next/future/image';
import { User } from '../../../src/types';

const user: User = {
    name: 'Florio',
    avatar: avatar,
    email: '',
    createdOn: 0,
};
type Props = {
    avatar: File;
}

function Avatar() {
  return (
      <div className='w-full h-full relative grid'>
          <Image
              src={user.avatar!}
              className='rounded-full p-12'
              alt='avatar'

          />
          <h1 className='text-[2rem] justify-self-center'>Welcome back, {user.name}</h1>

          <div className='flex px-4 pt-4'>
              <div className=' border border-black flex flex-col justify-center items-center py-4 w-full'>
                  <h1>Huddles</h1>
                  <p className='font-bold'>5</p>
              </div>

              <div className=' border border-black flex flex-col justify-center items-center py-4 w-full'>
                  <h1>Something</h1>
                  <p className='font-bold'>6</p>
              </div>

              <div className=' border border-black flex flex-col justify-center items-center py-4 w-full'>
                  <h1>Something</h1>
                  <p className='font-bold'>234</p>
              </div>
          </div>

      </div>
  )
}

export default Avatar