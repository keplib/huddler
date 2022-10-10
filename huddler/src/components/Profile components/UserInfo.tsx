import React from 'react'
import { User } from '../../../src/types';
import avatar from '../../../public/placeholder.jpg';

function UserInfo() {


    const user: User = {
        name: 'Florio',
        avatar: avatar,
        email: '',
        createdOn: 0,
    };

    return (
        <div className=' h-56 w-full p-6 px-12 text-lg'>
            <h1>User Info:</h1>
            <h1>Name</h1>
            <h1 className='text-2xl'>{user.name}</h1>
            <h1>Name</h1>
            <h1 className='text-2xl'>{user.name}</h1>
            <h1>Name</h1>
            <h1 className='text-2xl'>{user.name}</h1>
        </div>
    )
}

export default UserInfo