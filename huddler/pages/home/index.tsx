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
      <div className='flex flex-col items-center border-x-[0.2px] border-gray-400 w-1/4'>
        <h1 className='text-[2rem]'>Welcome back, {user.name}</h1>
        <br />
        <Image
          src={user.avatar!}
          className='rounded-[50%]'
          alt='avatar'
          width={150}
        ></Image>
        <section className='justify-self-end'>
          My huddles
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

      <div className='flex flex-col w-2/3'>hello</div>
    </main>
  );
}

export default Profile;

