import React, { useEffect, useRef, useState } from 'react';
import { Huddle } from '../types';
import { nowFormatted } from '../utils/helperFunctions';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { categoryTags } from '../categoryTags';

const NewHuddleForm = () => {
  const router = useRouter();

  const [imageSelected, setImageSelected] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  let [addedCategories, setAddedCategories] = useState([]);
  let [allCategories, setAllCategories] = useState(categoryTags);
  const [error, setError] = useState('');

  const titleRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLInputElement>(null);
  const whereRef = useRef<HTMLInputElement>(null);
  const whenRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const huddleCategories: string[] = [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError('');
      const newHuddle: Huddle = {
        name: titleRef.current!.value,
        createdOn: Date.now(),
        when: whenRef.current!.value,
        categories: [], //categoriesRef.current!.value,
        longitude: 0, //whereRef.current!.value, //do sth
        latitude: 0, //whereRef.current!.value, //do sth
        // for images we'll probably have to split what comes from the input field
        images: [imagesRef.current!.value],
        description: '',
        authorId: 123456, //here we'll require the uid from the authentication
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

  const addCategory = (category: string) => {
    if (huddleCategories.includes(category)) return;
    huddleCategories.push(category);
    console.log('These are the selected categories,', huddleCategories);
  };

  return (
    <main className='flex flex-col items-center border-solid border-2 p-10'>
      <h1>Let's make a new huddle</h1>
      {error && <div className='bg-red-600'>{error}</div>}
      <>
        <ul>
          {huddleCategories.map((category, i) => {
            return <li key={i}>{category}</li>
        })}
        </ul>
      </>
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
        <label htmlFor='categories'>Pick the categories of your huddle</label>
        <ul className='grid grid-flow-col grid-flow-rows gap-1'>
          {allCategories.map((category, i) => (
            <li
              key={i}
              className='text-xl bg-blue-600 px-3 h-9 rounded-r-[50px] rounded-l-[50px] text-white hover:scale-105  cursor-pointer active:translate-y-[2px] active:translate-x-[1px] focus:ring focus:ring-blue-300'
              onClick={() => addCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

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
        <label htmlFor='description'>What is your huddle?</label>
        <textarea
          className='border-solid border-2 border-black-600'
          ref={descriptionRef}
          id='description'
          autoComplete='on'
          placeholder='Add a description'
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

