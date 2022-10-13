import React, { useRef, useState } from 'react';
import Image from 'next/future/image';
import { User } from '../../types';

type Props = {
  userData: User;
  imagesRef: React.MutableRefObject<HTMLInputElement | null>;
  imageSelected: boolean;
  onSelectFile: Function;
};

// Contains a form for the user image

function FormThirdPage({
  userData,
  imagesRef,
  imageSelected,
  onSelectFile,
}: Props) {
  return (
    <div className='flex flex-col items-center py-8 w-3/4'>
      <h1 className='font-bold text-xl'>
        Do you want to upload profile image?
      </h1>

      <div className='h-full w-3/4 grid grid-cols-2'>
        <div className='flex justify-center items-center'>
          <input
            className=''
            ref={imagesRef}
            type='file'
            accept='.jpg, jpeg, .png, .gif'
            onChange={() => onSelectFile()}
            id='images'
          ></input>
        </div>

        <figure className='flex w-full h-full relative border rounded-full'>
          {imageSelected && (
            <Image
              className='w-full h-full rounded-full absolute px-8 mt-12'
              alt='image-preview'
              src={userData.image as string}
              width={300}
              height={300}
            />
          )}
        </figure>
      </div>
      <div className='p-24'></div>

      <div className='p-6'></div>
    </div>
  );
}

export default FormThirdPage;
