import { User } from '../../types';
import { useState, useRef } from 'react';
import UserImage from './UpdateUserImage';
import { postUserInfo } from '../../utils/APIServices/userServices';

type Props = {
  currentUser: User;
};

const PersonalInfo = ({ currentUser }: Props) => {
  const [error, setError] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError('');
      if (nameRef.current && nameRef.current!.value !== currentUser.username) {
        currentUser.username = nameRef.current.value;
      }

      if (emailRef.current && emailRef.current!.value !== currentUser.email) {
        currentUser.email = emailRef.current.value;
      }

      if (
        firstNameRef.current &&
        firstNameRef.current!.value !== currentUser.first_name
      ) {
        currentUser.first_name = firstNameRef.current.value;
      }

      if (
        lastNameRef.current &&
        lastNameRef.current!.value !== currentUser.last_name
      ) {
        currentUser.last_name = lastNameRef.current.value;
      }

      if (
        dateOfBirthRef.current &&
        dateOfBirthRef.current!.value !== currentUser.date_of_birth
      ) {
        currentUser.date_of_birth = dateOfBirthRef.current.value;
      }
      // postUserInfo(currentUser, currentUser.id as number)
    } catch {
      setError("We weren't able to update your profile. Please try again");
    }
  };
  return (
    <>
      {error && <div className='bg-red-600'>{error}</div>}
      <div className='flex items-center gap-10 h-screen'>
        <div className='flex flex-col'>
          <UserImage
            setDisabledButton={setDisabledButton}
            setError={setError}
            image={currentUser.image as string}
          />
          <label htmlFor='description'>Description</label>
          <textarea
            ref={descriptionRef}
            id='description'
            className='block'
            placeholder={currentUser.description}
            onChange={() => setDisabledButton(true)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>User name</label>
          <input
            ref={nameRef}
            className='block'
            type='text'
            placeholder={currentUser.username}
            onChange={() => setDisabledButton(false)}
          />
          <label htmlFor='email'>Email</label>
          <input
            ref={emailRef}
            id='email'
            className='block'
            type='email'
            placeholder={currentUser.email || ''}
            onChange={() => setDisabledButton(false)}
          />
          <label htmlFor='first-name'>First name</label>
          <input
            ref={firstNameRef}
            id='first-name'
            className='block'
            type='text'
            placeholder={currentUser.first_name || ''}
            onChange={() => setDisabledButton(false)}
          />
          <label htmlFor='last-name'>Last name</label>
          <input
            ref={lastNameRef}
            id='last-name'
            className='block'
            type='text'
            placeholder={currentUser.last_name || ''}
            onChange={() => setDisabledButton(false)}
          />
          <label htmlFor='date-of-birth'>Date of birth</label>
          <input
            ref={dateOfBirthRef}
            id='date-of-birth'
            className='block'
            type='text'
            placeholder={currentUser.date_of_birth || 'MM/DD/YYYY'}
            onFocus={(e) => (e.target.type = 'date')}
            onChange={() => setDisabledButton(true)}
          />
          <br />
          <div className='flex justify-center'>
            <button
              className='border-none bg-palette-dark hover:bg-opacity-60 hover:cursor-pointer rounded-md shadow-md text-white text-2xl mt-2 py-2 px-5'
              type='submit'
              disabled={disabledButton}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;


