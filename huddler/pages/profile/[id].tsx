import React, { useState } from 'react';
import Image from 'next/future/image';
import avatar from '../../public/placeholder.jpg';
import { User } from '../../src/types';
import { useRouter } from 'next/router';
function Profile() {
  //for testing
  const user: User = {
    name: 'Florio',
    avatar: avatar,
    email: '',
    createdOn: 0,
  };
  const router = useRouter();
  const [ownedHuddles, setOwnedHuddles] = useState(null);

  return (

    <main className='flex h-full'>
      {/* // Avatar  */}
      <div className='flex flex-col items-center border-x-[0.2px] border-gray-400 w-1/4'>
        
        <h1 className='text-[2rem] py-8'>Welcome back, {user.name}</h1>

        <div className='relative w-full h-full'>
          <Image
            src={user.avatar!}
            className='rounded-full p-12'
            alt='avatar'
            fill
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
      <div className='h-full w-full bg-yellow-200'> </div>
    </main>
  );
}

export default Profile;

