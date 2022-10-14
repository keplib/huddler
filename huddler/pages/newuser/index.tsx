import React from 'react';
import MainForm from '../../src/components/NewUserForm/MainForm';

function index() {
  return (
    <div className='flex justify-center '>
      <div className='border-solid border-[1px] border-palette-orange min-w-fit w-[50%] mt-10 px-3 rounded-[5px] shadow-md'>
        <MainForm />
      </div>
    </div>
  );
}

export default index;
