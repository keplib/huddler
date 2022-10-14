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
      
      <div className='w-full flex flex-col py-6 justify-center items-center'>       
          <div className='rounded-full w-96 h-[20rem] relative justify-center flex'>
              <Image
                  className='rounded-full'
                  src={user.image! as string}
                  placeholder='empty'
                  alt='avatar'
                  width={320}
                  height={320}
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