import React from 'react';
import { categoryTags } from '../../categoryTags';

// Contains a form for the categories

type Props = {
  location: any;
  setLocation: any;
};
function Location({ setLocation, location }: Props) 
// some logic where the user chooses its location and updates with setLocation()
{
  return (
    <div className='flex text-2xl font-bold flex-col py-8 w-3/5'>
      <h1>{"What's your location?"}</h1>

      <div className='h-1/2 border border-black'>
        <p> Map here? </p>
      </div>
    </div>
  );
}

export default Location;
