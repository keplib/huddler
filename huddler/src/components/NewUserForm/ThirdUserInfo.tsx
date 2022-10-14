import React from 'react';
import { User } from '../../types';

type Props = {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
};

// Contains a form for the user details

function UserInfo({ userData, setUserData }: Props) {
  console.log(userData);
  return (
    <>
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

      <div className='flex flex-col py-8 w-3/5'>
        <form className='flex flex-col'>
          <h1 className='font-bold text-2xl pb-4'>User details:</h1>
          <label>First Name</label>
          <input
            className='py-3'
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          ></input>
          <label>Last Name</label>
          <input
            className='py-3'
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          ></input>
          <label>Tell people who you are and what are your interests:</label>
          <textarea
            className='pb-16'
            value={userData.description}
            onChange={(e) =>
              setUserData({ ...userData, description: e.target.value })
            }
          ></textarea>
        </form>
      </div>
    </>
  );
}

export default UserInfo;
