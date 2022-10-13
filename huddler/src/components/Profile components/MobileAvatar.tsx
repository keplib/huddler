import React from 'react'
import avatar from '../../../public/placeholder.jpg';
import Image from 'next/future/image';

function MobileAvatar() {

    const user: User = {
        name: 'Florio',
        image: avatar,
        email: '',
        createdOn: 0,
    };

  return (
      <div className='w-full flex flex-col py-8 justify-center items-center'>
       
          <div className='rounded-full w-full h-full min-h-[300px] relative justify-center flex'>
              <Image
                  className='rounded-full'
                  src={user.image! as string}
                  placeholder='empty'
                  alt='avatar'
                  width={350}
                  height={300}
                  priority={true}
                  />
                  <h1 className='px-4 text-[2rem] self-center'>
                      Welcome back, {user.name}
                  </h1>
          </div>
      </div>
  )
}

export default MobileAvatar