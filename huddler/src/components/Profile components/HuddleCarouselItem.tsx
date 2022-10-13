import React from 'react';
import Image from 'next/future/image';
import { Huddle } from '../../types';

type Props = {
  huddle: Huddle;
};

function HuddleCarouselItem({ huddle }: Props) {
  return (
    <>
      <Image
        src={huddle.image}
        width={300}
        height={300}
        className='h-full w-[300px] max-h-72 col-span-1 rounded-lg'
        alt={huddle.name}
      />
      <div className='flex flex-col justify-self-start max-w-[300px] w-full text-lg pt-2'>
        <h1>{huddle.name}</h1>
        <p>{huddle.day_time}</p>
        <p>{huddle.description}</p>
      </div>
    </>
  );
}

export default HuddleCarouselItem;
