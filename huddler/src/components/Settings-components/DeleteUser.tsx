import { useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  currentUserId: number;
};

const DeleteUser = ({ currentUserId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      // await some function that with the currentUserId deletes the user in authentication provider and in our DB
      router.replace('/');
    } catch {
      setError("We weren't able to delete your account. Please try again");
    }
  };
  return (
    <>
      {error && <div className='bg-red-600'>{error}</div>}
      <h1>You are about to delete you account</h1>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default DeleteUser;

