import Image, { StaticImageData } from 'next/future/image';
import DefaultUserImage from '../../../public/defaultUserImage.png';
import { useState, useRef } from 'react';

type Props = {
  setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  image: string;
};

const UserImage = ({ setDisabledButton, setError, image }: Props) => {
  const [userImage, setUserImage] = useState<StaticImageData | string>(
    DefaultUserImage
  );
  const inputImageRef = useRef<HTMLInputElement>(null);

  const changeUserImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      //Update image in DB
      setDisabledButton(false);
      setUserImage(URL.createObjectURL(e.target.files[0]));
      image = URL.createObjectURL(e.target.files[0]);
    } catch {
      setError('Failed to upload the new user image. Please try again');
    }
  };
  return (
    <div className='flex flex-col items-center mb-10'>
      Click on the image to change it
      <input
        type='file'
        className='hidden'
        accept='.jpg, jpeg, .png, .gif'
        ref={inputImageRef}
        onChange={changeUserImage}
      />
      <Image
        src={userImage}
        className='rounded-full hover:cursor-pointer'
        width={150}
        height={150}
        alt='user-image'
        onClick={() => inputImageRef.current!.click()}
      />
    </div>
  );
};

export default UserImage;

