import React, { useState } from 'react';
import Image from 'next/future/image';
import avatar from '../../public/placeholder.jpg';
import { User } from '../../src/types';
import { useRouter } from 'next/router';
import { triggerAsyncId } from 'async_hooks';
import Huddles from '../../src/components/Home-components/Huddles';
function Profile() {
  //for testing
  const user: User = {
    name: 'Florio',
    avatar: avatar,
    email: '',
    createdOn: 0,
  };

  const tags = ["fishing", "kebab", "snooker", "JavaScript"]

  const router = useRouter();
  const [ownedHuddles, setOwnedHuddles] = useState(null);

  return (

    <main className='grid grid-cols-4 h-full py-8'>
      <div className='flex flex-col h-screen items-center border-x-[0.2px] border-gray-400'>


        {/* // Avatar  */}
        <div className='w-full h-full relative grid'>
          <Image
            src={user.avatar!}
            className='rounded-full p-12'
            alt='avatar'
            
          />
          <h1 className='text-[2rem] justify-self-center'>Welcome back, {user.name}</h1>

          <div className='grid grid-cols-3 px-24 p-4'>
            <div className=' border border-black flex flex-col justify-center items-center p-4'>
              <h1>Huddles</h1>
              <p>5</p>
            </div>

            <div className=' border border-black flex flex-col justify-center items-center p-4'>
              <h1>Something</h1>
              <p>6</p>
            </div>

            <div className=' border border-black flex flex-col justify-center items-center p-4'>
              <h1>Something else</h1>
              <p>234</p>
            </div>
          </div>
        
        </div>

        <div className=' h-56 w-full p-6 px-12 text-lg'>
          <h1>User Info:</h1>
          <h1>Name</h1>
          <h1 className='text-2xl'>{user.name}</h1>
          <h1>Name</h1>
          <h1 className='text-2xl'>{user.name}</h1>
          <h1>Name</h1>
          <h1 className='text-2xl'>{user.name}</h1>
        </div>

        <div className='h-full w-full flex justify-center mt-8 border'>

          <button
            className='border-[0.2px] border-gray-400 bg-blue-400 rounded-[5px] h-16 p-4'
            onClick={() => router.push('/create')}
          >
            Create a Huddle
          </button>
        </div>

      </div>

      <div className='h-full w-full bg-yellow-200 col-span-3'>

        <h1 className='py-8 p-4 text-3xl'>Interests:</h1>
        <div className='flex flex-wrap bg-white gap-4 p-4 border'>
          {tags.map((tag) => (
            <h1 className='text-xl bg-blue-600 py-2 px-4 rounded text-white hover:scale-150 hover:mx-4 cursor-pointer'>{tag}</h1>
          ))}
        </div>

        <div>
          <Huddles />
        </div>


      </div>
    </main>
  );
}

export default Profile;

