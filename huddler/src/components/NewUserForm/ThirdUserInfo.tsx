import React, { useRef, useState } from 'react';
import { User } from '../../types';
import Image, { StaticImageData } from 'next/future/image';
import DefaultUserImage from '../../../public/defaultUserImage.png';
type Props = {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  handleSubmit: Function;
};

// Contains a form for the user details

function UserInfo({ userData, setUserData, handleSubmit }: Props) {
  const [imageSelected, setImageSelected] = useState<StaticImageData | string>(
    DefaultUserImage
  );
  const imageRef = useRef<HTMLInputElement | null>(null);

  const changeUserImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files) return;
    const image = URL.createObjectURL(e.target.files[0]);
    setImageSelected(image);
    setUserData({ ...userData, image: image });
  };
  return (
    <>
      <div className='flex flex-col py-8 w-1/2 px-10'>
        <form className='flex flex-col'>
          <h1 className='font-bold text-2xl pb-4 self-center'>User details</h1>
          <label>Choose a User Name</label>
          <input
            className='py-3'
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          ></input>
          <label>First Name</label>
          <input
            className='py-3'
            onChange={(e) =>
              setUserData({ ...userData, first_name: e.target.value })
            }
          ></input>
          <label>Last Name</label>
          <input
            className='py-3'
            onChange={(e) =>
              setUserData({ ...userData, last_name: e.target.value })
            }
          ></input>
          <label>Tell people who you are and what are your interests:</label>
          <textarea
            className='pb-16'
            onChange={(e) =>
              setUserData({ ...userData, description: e.target.value })
            }
          ></textarea>
        </form>
      </div>
      <div className='flex flex-col items-center py-8 w-1/2 h-full'>
        <h1 className='font-bold text-xl'>
          Do you want to upload a profile image?
        </h1>
        <div className='flex flex-col items-center justify-center mt-20'>
          <div>
            Click on the image to change it
            <input
              type='file'
              className='hidden'
              accept='.jpg, jpeg, .png, .gif'
              ref={imageRef}
              onChange={changeUserImage}
            />
            <Image
              className='rounded-full hover:cursor-pointer ml-10'
              alt='image-preview'
              src={imageSelected}
              width={150}
              height={150}
              onClick={() => imageRef.current!.click()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
