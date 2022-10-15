import { useState } from 'react';
import { useRouter } from 'next/router';
import { deleteAllUserCategories, deleteUser } from '../../utils/APIServices/userServices';

type Props = {
  currentUserId: number;
};

const DeleteUser = ({ currentUserId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      // await some function that with the currentUserId deletes the user in authentication provider and in our DB
      deleteUser(2)
      deleteAllUserCategories(2)
      //TODO delete user from congnito
      router.replace('/');
    } catch {
      setError("We weren't able to delete your account. Please try again");
    }
  };
  return (
    <>
      {error && <div className='bg-red-600'>{error}</div>}
      <div className='flex flex-col gap-10 items-center'>
        <h1 className='text-2xl font-bold'>
          You are about to delete you account
        </h1>
        <div>
          <button
            className='border-none bg-palette-dark hover:bg-opacity-60 hover:cursor-pointer rounded-md shadow-md text-white text-2xl mt-2 py-2 px-5'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;


