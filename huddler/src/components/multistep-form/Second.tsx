
import React from 'react'

function Second({ description, setDescription, firstName, setFirstName, lastName, setLastName }) {
    return (

        <div className='flex flex-col py-8 w-3/4'>
           

            <form className='grid gap-8'>
                <label className='font-bold'>User deetz:</label>
                <label>First Name</label>
                <input className='py-3' value={firstName} onChange={(e) => setFirstName(e.target.value)} ></input>
                <label>Last Name</label>
                <input className='py-3' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                <label>Write a small description:</label>
                <textarea className='text-xl pb-16' onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
            </form>
        </div>
    );
}

export default Second