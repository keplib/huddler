import React, { useRef, useState } from 'react';
import { Huddle } from '../types';
import { nowFormatted } from '../../utils/helperFunctions';
import Image from 'next/future/image';
import { useRouter } from 'next/router';

const NewHuddleForm = () => {
  const router = useRouter();

  const [imageSelected, setImageSelected] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLInputElement>(null);
  const whereRef = useRef<HTMLInputElement>(null);
  const whenRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError('');
      const newHuddle: Huddle = {
        name: titleRef.current!.value,
        createdOn: Date.now(),
        when: whenRef.current!.value,
        categories: categoriesRef.current!.value,
        longitude: whereRef.current!.value, //do sth
        latitude: whereRef.current!.value, //do sth
        // for images we'll probably have to split what comes from the input field
        images: [imagesRef.current!.value],
      };
      //Post huddle in DB

      //redirect to user home page
      // router.replace('/home')
    } catch {
      setError('We could not create the huddle');
    }
  };
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageSelected(true);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <main className='flex flex-col items-center border-solid border-2 p-10'>
      <h1>Let's make a new huddle</h1>
      {error && <div className='bg-red-600'>{error}</div>}
      <form
        className='flex flex-col'
        onSubmit={handleSubmit}
      >
        <label htmlFor='title'>Title</label>
        <input
          className='border-solid border-2 border-black-600'
          ref={titleRef}
          type='text'
          id='title'
          autoComplete='on'
          required
        />
        <label htmlFor='categories'>Categories</label>
        <input
          className='border-solid border-2 border-black-600'
          ref={categoriesRef}
          type='text'
          id='categories'
          autoComplete='on'
          required
        />
        <label htmlFor='where'>Where?</label>
        <input
          className='border-solid border-2 border-black-600'
          // ref={emailRef}
          type='text'
          id='where'
          autoComplete='on'
          required
        />
        <label htmlFor='when'>When?</label>
        <input
          className='border-solid border-2 border-black-600'
          ref={whenRef}
          type='datetime-local'
          id='dateTime'
          autoComplete='on'
          min={nowFormatted()}
          required
        />
        <label htmlFor='images'>
          Do you want images to show in your huddle?
        </label>
        <input
          className='border-solid border-2 border-black-600'
          ref={imagesRef}
          type='file'
          accept='.jpg, jpeg, .png, .gif'
          onChange={onSelectFile}
          id='images'
        />
        {imageSelected && (
          <figure>
            <Image
              width={100}
              height={100}
              id='image-preview'
              alt='image-preview'
              src={imagePreview}
            />
          </figure>
        )}
        <button
          className='border-solid border-2 border-black-600'
          type='submit'
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewHuddleForm;

