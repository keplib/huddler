import Image from 'next/image';
import React from 'react';
import { dateFormatter } from '../../utils/helperFunctions';
const HuddleCard = ({ item, handleActive, active }: any) => {
  console.log(item)
  const dateTime = dateFormatter(item.day_time)
  return item !== active ? (
    // Huddles class
    <div
      className='grid grid-cols-3 rounded-[5px] border-solid border-[0.5px] border-gray-300 p-2'
      onClick={() => handleActive(item)}
    >
      <div>
        <Image
          className='rounded-[5px]'
          alt='event-image'
          src={item.image}
          height={175}
          width={175}
        />
      </div>
      <div className='col-span-1 self-center'>
        <h1>
          <strong>{item.name}</strong>
        </h1>
        <br/>
        <p>At {item.address}</p>
        <p>{item.description}</p>
        <br/>
        <p>
          On {dateTime.monthDayYear} at {dateTime.time}
        </p>
      </div>
    </div>
  ) : (
    // Active huddle class
    <div
      className='flex flex-col bg-red-200 border p-4'
      onClick={() => handleActive(item)}
    >
      <div className='col-span-2'>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>
      <div className='inline-block h-full w-full'>
        {item.images.stringValues.map((image: string, i: number) => (
          <Image
            src={image}
            height={200}
            width={200}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default HuddleCard;





