import Image, { StaticImageData } from 'next/future/image';
import DefaultUserImage from '../../../public/defaultUserImage.png';
import { useState, useRef } from 'react';

type Props = {
  setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const UpdateAvatar = ({setDisabledButton, setError}: Props) => {
  const [avatar, setAvatar] = useState<StaticImageData | string>(
    DefaultUserImage
  );
  const inputImageRef = useRef<HTMLInputElement>(null);

  const changeUserImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      //Update image in DB
      setDisabledButton(false);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    } catch {
      setError('Failed to upload the new image. Please try again');
    }
  };
  return (
    <div>
      Click on the image to change it
      <input
        type='file'
        className='hidden'
        accept='.jpg, jpeg, .png, .gif'
        ref={inputImageRef}
        onChange={changeUserImage}
      />
      <Image
        src={avatar}
        className='rounded-full hover:cursor-pointer'
        width={150}
        height={150}
        alt='avatar'
        onClick={() => inputImageRef.current!.click()}
      />
    </div>
  );
};

export default UpdateAvatar;






