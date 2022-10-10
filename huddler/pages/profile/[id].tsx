import React, { useState } from 'react';
import Image from 'next/image';
import avatar from '../../public/placeholder.jpg';
import { User } from '../../src/types';
import { useRouter } from 'next/router';
import { triggerAsyncId } from 'async_hooks';
function Profile() {
  //for testing
  const user: User = {
    name: 'Florio',
    avatar: avatar,
    email: '',
    createdOn: 0,
  };

  const tags = ["fishing", "kebab", "snooker"]
  
  const router = useRouter();
  const [ownedHuddles, setOwnedHuddles] = useState(null);

  return (

    <main className='grid grid-cols-4 h-full'>
      <div className='flex flex-col items-center border-x-[0.2px] border-gray-400'>

      {/* // Avatar  */}
        <h1 className='text-[2rem] py-8'>Welcome back, {user.name}</h1>

        <div className='relative w-full h-full'>
          <Image
            src={user.avatar!}
            // className='rounded-full'
            alt='avatar'           
          />
        </div>

        <section className='h-full w-full bg-red-300 flex flex-col items-center'>
          <h1>
            My huddles
          </h1>

          <div>
            {/* {ownedHuddles && render list of owned huddles} */}
            {!ownedHuddles && (
              <button
                className='border-[0.2px] border-gray-400 bg-blue-400 rounded-[5px] p-1'
                onClick={() => router.push('/create')}
              >
                Create a Huddle
              </button>
            )}
          </div>
        </section>

      </div>

      <div className='h-full w-full bg-yellow-200 col-span-3'>

        <div className='h-48 w-full '>
          

       </div>


        <div className='flex flex-wrap bg-white gap-4 p-2 border'>
          {tags.map((tag) => (
            <h1 className='text-xl bg-blue-600 p-2 px-4 rounded text-white'>{tag}</h1>
          ))}          
        </div>
          
      </div>
    </main>
  );
}

export default Profile;

