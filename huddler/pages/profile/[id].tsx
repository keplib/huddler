import React, { useEffect, useState } from 'react';
import { Huddle, User } from '../../src/types';
import router, { useRouter } from 'next/router';
import Avatar from '../../src/components/Profile components/Avatar';
import avatar from '../../public/placeholder.jpg';
import UserInfo from '../../src/components/Profile components/UserInfo';
import useSWR from 'swr';
import { fetcher } from '../../src/utils/APIServices/fetcher';
import { recommendedForUser } from '../../src/utils/helperFunctions';
import HuddleCarousel from '../../src/components/Profile components/HuddleCarousel';

export const getServerSideProps = async () => {
  const recommended:Huddle[] = await recommendedForUser(67);
  const huddles:Huddle[] = await fetcher("https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted")
    
  return {
    props: {
      recommended,
      huddles,
    }
  }
}

function Profile({recommended, huddles}) {

  //Get user id from auth for the tag hook
  const { data: tags, error: tagsError } = useSWR(`https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/users_categories?user-id=${67}`, fetcher);
  const { data: userCreatedHuddles, error: userHuddleError } = useSWR(`https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_created?user-id=${67}`, fetcher);

  if (tagsError || userHuddleError) return <div>failed to load</div>;
  if (!huddles || !tags || !userCreatedHuddles || !recommended) return <div>loading...</div>;

  return (

    <main className='grid grid-cols-3 2xl:grid-cols-4 h-full py-8 lg:bg-palette-light bg-red-200'>
      <div className='flex flex-col h-full items-center border-x-[0.2px] border-gray-400'>
        <Avatar />
        <UserInfo created={userCreatedHuddles.length} />
        <div className='h-1/9 w-full flex justify-center mt-8 border'>
          <button
            className='border-[0.2px] bg-palette-dark text-white rounded-[5px] h-16 p-4'
            onClick={() => router.push('/create')}
          >
            Create a Huddle
          </button>
        </div>
      </div>

      <div className='h-full w-full col-span-2 2xl:col-span-3 overflow-auto px-6'>
        <h1 className='pt-8 pb-2 px-4 text-3xl'>Interests:</h1>
        <div className='flex flex-wrap gap-4 p-2 border'>
          {tags.map((tag, i) => (
            <h1 className='text-xl bg-palette-dark py-2 px-4 rounded text-white hover:scale-150 hover:mx-4 cursor-pointer' key={i}>{tag.name}</h1>
          ))}
        </div>

        <h1 className='py-6 p-4 text-3xl'>Created huddles:</h1>
        <HuddleCarousel huddles={userCreatedHuddles} />

        <h1 className='py-6 p-4 text-3xl'>My huddles:</h1>
        <HuddleCarousel huddles={huddles} />


        <h1 className='py-6 p-4 text-3xl'>Recommended:</h1>
        <HuddleCarousel huddles={recommended} />
       

      </div>
    </main>
  );
}

export default Profile;

