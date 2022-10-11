import React, { useState } from 'react';
import { addAbortSignal } from 'stream';
import { categoryTags } from '../../categoryTags';

function Welcome({ handleTag }) {

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (

    <div className='flex flex-col py-8 w-3/5'>
      <h1>What's your location?</h1>
      
      <div className='h-1/2 border border-black'>
        <p> Map here? </p>
      </div>

      <div className='flex flex-col py-8'>
        <h1 className='self-center'>Choose your interests:</h1>
        <div className='flex gap-4 py-4 self-center'>
          {categoryTags.map((category: string, i) => (
            <h1 className='h-[40px] text-xl bg-blue-600 py-2 px-3 rounded text-white cursor-pointer'
              key={i} onClick={() => handleTag(category)}>{category}</h1>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
