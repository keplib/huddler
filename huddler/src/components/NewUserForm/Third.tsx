
import React, { useRef, useState } from 'react'
import Image from 'next/future/image';

function Third({ userData,imagesRef, imageSelected, onSelectFile }) {


  return (
    <div className='flex flex-col items-center py-8 w-3/4'>
      <h1 className='font-bold text-xl'>Do you want to upload profile image?</h1>

      <div className='h-full w-3/4 grid grid-cols-2'>

        <div className='flex justify-center items-center'>
          <input className=''
            ref={imagesRef}
            type="file"
            accept=".jpg, jpeg, .png, .gif"
            onChange={onSelectFile}
            id="images">
          </input>
        </div>

        <figure className="flex w-full h-full relative border rounded-full">
        {imageSelected && (
            <Image
              className="w-full h-full rounded-full absolute px-8 mt-12"
              // id="image-preview"
              alt="image-preview"
              src={userData.image}
              width={300}
              height={300}
            />
            )}
            </figure>
      </div>
      <div className='p-24'></div>


      <div className='p-6'></div>
    </div>
  )
}

export default Third