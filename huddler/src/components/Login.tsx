import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      console.log(emailRef.current!.value, passwordRef.current!.value);
      // some login API call that will change the current user to authenticated

      // go to the home page
      // router.replace('/home')
    } catch {
      // eventually we want to say to the user the error reason. E.g. email does not exist, or wrong password, etc.
      setError('Failed to sign in');
    }
    setLoading(false);
  };
  return (
    <main className='flex flex-col items-center border-solid border-2 border-indigo-600 p-10 bg-white'>
      <h1>Log In</h1>
      {error && <div className='bg-red-600'>{error}</div>}
      <form
        className='flex flex-col'
        onSubmit={submitHandler}
      >
        <label htmlFor='email'>Email</label>
        <input
          className='border-solid border-2 border-black-600'
          ref={emailRef}
          type='email'
          id='email'
          autoComplete='on'
          required
        />
        <label htmlFor='Password'>Password</label>
        <input
          className='border-solid border-2 border-black-600'
          ref={passwordRef}
          type='password'
          id='password'
          autoComplete='on'
          required
        />
        <br />
        <div className='flex justify-center'>
          <button
            className='border-solid border-2 border-black-600 w-48'
            type='submit'
            disabled={loading}
          >
            Log in
          </button>
        </div>
      </form>
      <div className=''>------------------------</div>
      <div className=''>Log in with Google</div>
      <div>Need an account?</div>
      <Link href='/'>Sign Up</Link>
    </main>
  );
}

export default Login;
