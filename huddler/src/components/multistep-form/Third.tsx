
import React from 'react'

function Third({handleSubmit}) {
  return (
    <div className='flex flex-col items-center py-8 w-3/4'>
      <h1>Upload profile image?</h1>

      <div className='h-1/2 border border-black w-3/4'>
        <p> Image Upload here? </p>
      </div>
      <div className='p-24'></div>


      <div className='p-6'></div>
      <button className='' onClick={() => handleSubmit()}>Submit</button>
      
      </div>
  )
}

export default Third