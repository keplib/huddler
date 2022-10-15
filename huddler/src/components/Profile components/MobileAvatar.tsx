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
      
        <div className=' w-full flex flex-col py-6 justify-center items-center'>       
            {/* <div className='rounded-full h-72 w-72 md:w-96 md:h-96 relative flex'>
              <Image
                  className='rounded-full'
                  src={user.image! as string}
                  placeholder='empty'
                  alt='avatar'
                  fill
                  priority={true}
                  />
          </div> */}
                  <h1 className='p-4 text-[2rem] font-bold'>
                      Welcome back, {user.name}
                  </h1>
      </div>
  )
}

export default MobileAvatar