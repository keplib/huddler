import React, { useState } from 'react';
import { User } from '../../src/types';
import { useRouter } from 'next/router';
import { triggerAsyncId } from 'async_hooks';
import Huddles from '../../src/components/Home-components/Huddles';
import Avatar from '../../src/components/Profile components/Avatar';
import Image from 'next/future/image';
import avatar from '../../public/placeholder.jpg';
import UserInfo from '../../src/components/Profile components/UserInfo';

function Profile() {
  //for testing
  const tags = ["fishing", "kebab", "snooker", "JavaScript"]

  const router = useRouter();
  const [ownedHuddles, setOwnedHuddles] = useState(null);

  const user: User = {
    name: 'Florio',
    avatar: avatar,
    email: '',
    createdOn: 0,
  };

  return (

    <main className='grid grid-cols-4 h-full py-8'>
      <div className='flex flex-col h-screen items-center border-x-[0.2px] border-gray-400'>

        <Avatar />
        <UserInfo />

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
          {tags.map((tag,i) => (
            <h1 className='text-xl bg-blue-600 py-2 px-4 rounded text-white hover:scale-150 hover:mx-4 cursor-pointer' key={i}>{tag}</h1>
          ))}
        </div>

        <div>
          {/* <Huddles /> */}
        </div>


      </div>
    </main>
  );
}

export default Profile;

