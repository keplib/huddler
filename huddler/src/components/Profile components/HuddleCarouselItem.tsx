import React from 'react'
import Image from 'next/future/image'

function HuddleCarouselItem({ hud }) {

    return (
        <>
            <Image src={hud.image} width={300} height={300} className="h-full w-[300px] max-h-72 col-span-1 rounded-lg" alt={hud.name} />
            <div className='flex flex-col justify-self-start max-w-[300px] w-full text-lg pt-2'>
                <h1>{hud.name}</h1>
                <p>{hud.day_time}</p>
                <p>{hud.description}</p>
            </div>
        </>
    )
}

export default HuddleCarouselItem