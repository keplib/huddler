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
        <>
            <div className='flex px-4 pt-4 w-full bg-green-200'>
                <div className=' border border-black flex flex-col justify-center items-center py-4 w-full'>
                    <h1>Huddles</h1>
                    <p className='font-bold'>5</p>
                </div>

                <div className=' border border-black flex flex-col justify-center items-center py-4 w-full'>
                    <h1>Something</h1>
                    <p className='font-bold'>6</p>
                </div>

                <div className=' border border-black flex flex-col justify-center items-center py-4 w-full'>
                    <h1>Something</h1>
                    <p className='font-bold'>234</p>
                </div>
            </div>

            <div className=' w-full p-6 px-12 text-lg bg-red-200'>
                <h1>User Info:</h1>
                <h1>Name</h1>
                <h1 className='text-2xl'>{user.name}</h1>
                <h1>Name</h1>
                <h1 className='text-2xl'>{user.name}</h1>
                <h1>Name</h1>
                <h1 className='text-2xl'>{user.name}</h1>
            </div>
        </>
    )
}

export default UserInfo