import React from 'react';
import { Huddle } from '../../types';
import HuddleCarouselItem from './HuddleCarouselItem';

type Props = {
  huddles: Huddle[];
};

function HuddleCarousel({ huddles }: Props) {
  return (
    <div
      className=' h-72 flex overflow-x-scroll gap-3'
      id='carousel'
    >
      {huddles.map((huddle) => (
        <div
          className='gap-4 grid grid-cols-2 flex-grow-1 flex-shrink-0 border-palette-dark hover:border-palette-orange bg-white bg-opacity-50 border relative rounded-lg'
          key={huddle.id}
        >
          <HuddleCarouselItem huddle={huddle} />
        </div>
      ))}
    </div>
  );
}

export default HuddleCarousel;
