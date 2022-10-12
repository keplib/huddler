import { User } from '../../types';
import { useState, useRef } from 'react';
import UpdateAvatar from './UpdateAvatar';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError('');
      if (nameRef.current && nameRef.current!.value !== currentUser.name) {
        // await some function to update name in the DB
      }

      if (emailRef.current && emailRef.current!.value !== currentUser.email) {
        // await some function to update email in the DB and auth provider
      }

      if (
        firstNameRef.current &&
        firstNameRef.current!.value !== currentUser.firstName
      ) {
        // await some function to update firstName in the API
      }

      if (
        lastNameRef.current &&
        lastNameRef.current!.value !== currentUser.lastName
      ) {
        // await some function to update lastName in the API
      }

      if (
        dateOfBirthRef.current &&
        dateOfBirthRef.current!.value !== currentUser.dateOfBirth
      ) {
        // await some function to update the dateOfBirth in the API
      }
    } catch {
      setError("We weren't able to update your profile. Please try again");
    }
  };
  return (
    <>
      {error && <div className='bg-red-600'>{error}</div>}
      <UpdateAvatar
        setDisabledButton={setDisabledButton}
        setError={setError}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Update your user name</label>
        <input
          ref={nameRef}
          className='block'
          type='text'
          placeholder={currentUser.name}
          onChange={() => setDisabledButton(false)}
        />
        <label htmlFor='email'>Update your email</label>
        <input
          ref={emailRef}
          id='email'
          className='block'
          type='email'
          placeholder={currentUser.email || ''}
          onChange={() => setDisabledButton(false)}
        />
        <label htmlFor='first-name'>Add your first name</label>
        <input
          ref={firstNameRef}
          id='first-name'
          className='block'
          type='text'
          placeholder={currentUser.firstName || ''}
          onChange={() => setDisabledButton(false)}
        />
        <label htmlFor='last-name'>Add your last name</label>
        <input
          ref={lastNameRef}
          id='last-name'
          className='block'
          type='text'
          placeholder={currentUser.lastName || ''}
          onChange={() => setDisabledButton(false)}
        />
        <label htmlFor='date-of-birth'>Add your date of birth</label>
        <input
          ref={dateOfBirthRef}
          id='date-of-birth'
          className='block'
          type='text'
          placeholder={currentUser.dateOfBirth || 'MM/DD/YYYY'}
          onFocus={(e) => (e.target.type = 'date')}
          onChange={() => setDisabledButton(true)}
        />

        <button
          type='submit'
          disabled={disabledButton}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default PersonalInfo;

