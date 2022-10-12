import React, { useState } from 'react';
import { User } from '../../src/types';
import { useRouter } from 'next/router';
import { triggerAsyncId } from 'async_hooks';
import Huddles from '../../src/components/Home-components/Huddles';
import Avatar from '../../src/components/Profile components/Avatar';
import Image from 'next/future/image';
import avatar from '../../public/placeholder.jpg';
import UserInfo from '../../src/components/Profile components/UserInfo';
import useSWR from 'swr';
import { fetcher } from '../../src/utils/APIServices/fetcher';
import { getAllHuddles } from '../../src/utils/APIServices/huddleServices';

function Profile() {
  //for testing
  const tags = ["fishing", "kebab", "snooker", "JavaScript"];
  // const { data, error } = useSWR("https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getusers",fetcher);
  const { data: huddles, error: huddleError } = getAllHuddles();
  // const { data: uzer, error: uzerError } = useSWR("https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getuser_byid?user-id=67", fetcher);


  if (huddleError ) return <div>failed to load</div>;
  if (!huddles ) return <div>loading...</div>;
  console.log(huddles);

  const router = useRouter();
  const [ownedHuddles, setOwnedHuddles] = useState(null);

  const user: User = {
    name: 'Florio',
    avatar: avatar,
    email: '',
    createdOn: 0,
  };

  // console.log(uzer);

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

        <h1 className='py-8'>Created huddles:</h1>
        <div className='bg-slate-200 h-1/4 flex overflow-x-scroll gap-2'>
          {huddles.map((hud) => (
            <div className='bg-red-500 gap-4 grid grid-cols-2 flex-grow-1 flex-shrink-0 border-black border relative'>

              <Image src={hud.image} width={300} height={300} className="h-full w-full max-w-[300px] max-h-[300px]" />
              <div className='flex flex-col justify-self-start max-w-[300px] w-full'>
                <h1>{hud.name}</h1>
                <p>{hud.day_time}</p>
                <p>{hud.description}</p>
              </div>
              
            </div>
          ))}         
        </div>

        <h1 className='py-8'>My huddles:</h1>
        <div className='bg-slate-200 h-1/4 flex overflow-x-scroll gap-2'>
          {huddles.map((hud) => (
            <div className='bg-red-500 gap-4 grid grid-cols-2 flex-grow-1 flex-shrink-0 border-black border relative'>

              <Image src={hud.image} width={300} height={300} className="h-full w-full max-w-[300px] max-h-[300px]" />
              <div className='flex flex-col justify-self-start max-w-[300px] w-full'>
                <h1>{hud.name}</h1>
                <p>{hud.day_time}</p>
                <p>{hud.description}</p>
              </div>

            </div>
          ))}
        </div>


      </div>
    </main>
  );
}

export default Profile;

