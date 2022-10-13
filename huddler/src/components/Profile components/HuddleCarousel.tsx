import React from 'react'
import HuddleCarouselItem from './HuddleCarouselItem'

function HuddleCarousel({huddles}) {
  return (
      <div className=' h-72 flex overflow-x-scroll gap-3' id="carousel">
          {huddles.map((hud) => (
              <div className='gap-4 grid grid-cols-2 flex-grow-1 flex-shrink-0 border-palette-dark hover:border-palette-orange bg-white bg-opacity-50 border relative rounded-lg' key={hud.id}>
                  <HuddleCarouselItem hud={hud} />
              </div>
          ))}
      </div>
  )
}

export default HuddleCarousel