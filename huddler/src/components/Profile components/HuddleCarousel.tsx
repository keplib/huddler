import React from 'react'
import HuddleCarouselItem from './HuddleCarouselItem'

function HuddleCarousel({huddles}) {
  return (
      <div className=' h-1/4 flex overflow-x-scroll gap-2'>
          {huddles.map((hud) => (
              <div className='gap-4 grid grid-cols-2 flex-grow-1 flex-shrink-0 border-black border relative rounded-lg' key={hud.id}>

                  <HuddleCarouselItem hud={hud} />

              </div>
          ))}
      </div>
  )
}

export default HuddleCarousel