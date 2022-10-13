import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";

import Avatar from "../../src/components/Profile components/Avatar";
import UserInfo from "../../src/components/Profile components/UserInfo";
import avatar from "../../public/placeholder.jpg";
import useSWR from "swr";
import HuddleCarousel from "../../src/components/Profile components/HuddleCarousel";

import { fetcher, recommendedForUser } from "../../src/utils/helperFunctions";
import { Category, Huddle, User } from "../../src/types";
import MobileAvatar from "../../src/components/Profile components/MobileAvatar";

export const getServerSideProps = async () => {
  const recommended: Huddle[] = await recommendedForUser(67);
  const huddles: Huddle[] = await fetcher(
    "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted"
  );

  return {
    props: {
      recommended,
      huddles,
    },
  };
};

type Props = {
  recommended: Huddle[];
  huddles: Huddle[];
};

function Profile({ recommended, huddles }: Props) {
  //Get user id from auth for the tag hook
  const { data: tags, error: tagsError } = useSWR(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/users_categories?user-id=${67}`,
    fetcher
  );
  const { data: userCreatedHuddles, error: userHuddleError } = useSWR(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_created?user-id=${67}`,
    fetcher
  );
  const { data: huddlesUserIsGoing, error: userGoingError } = useSWR(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_isgoing?user-id=${67}`,
    fetcher
  );

  if (tagsError || userHuddleError || userGoingError)
    return <div>failed to load</div>;
  if (!tags || !userCreatedHuddles || !recommended || !huddlesUserIsGoing)
    return <div>loading...</div>;

  return (
    <main className='flex flex-col lg:grid lg:grid-cols-3 2xl:grid-cols-4 h-full py-8 lg:bg-palette-light bg-red-200'>
      <div className="hidden lg:block">
        <div className='fixed min-w-[20%] h-full'>
          <div
            className='flex flex-col h-full items-center
          border-x-[0.2px] shadow-md w-full'
          >
            <Avatar />
            <UserInfo numOfCreatedHuddles={userCreatedHuddles.length} />
            <div className='h-1/9 w-full flex flex-col justify-center mt-8 border gap-6'>
              <h1 className='text-3xl self-center'>Feeling Inspired?</h1>
              <button
                className='self-center text-2xl bg-palette-dark text-white rounded-[5px] h-16 p-4 w-[210px] active:translate-x-[1px] active:translate-y-[1px]'
                onClick={() => router.push('/create')}
              >
                Create a Huddle
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileAvatar />
      </div>


      <div className="h-full w-full col-span-2 2xl:col-span-3 overflow-auto">
        <h1 className="py-8 p-4 text-3xl">Interests:</h1>
        <div className="flex flex-wrap gap-4 p-4">
          {tags.map((tag: Category, i: number) => (
            <h1
              className="text-xl bg-palette-dark py-2 px-4 rounded text-white hover:bg-opacity-60 cursor-pointer"
              key={i}
            >
              {tag.name}
            </h1>
          ))}
        </div>

        <h1 className="py-6 p-4 text-3xl">Created huddles:</h1>
        <HuddleCarousel huddles={userCreatedHuddles} />

        <h1 className="py-6 p-4 text-3xl">Huddles I'm going to:</h1>
        <HuddleCarousel huddles={huddlesUserIsGoing} />

        <h1 className="py-6 p-4 text-3xl">Recommended:</h1>
        <HuddleCarousel huddles={recommended} />
      </div>
    </main>
  );
}

export default Profile;
