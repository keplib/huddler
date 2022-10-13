import Image from 'next/future/image';
import { useState } from 'react';
import rightArrow from '../../../public/right-arrow.png';

type Props = {
  setOption: React.Dispatch<React.SetStateAction<string>>;
};

const arrowImage = (
  <Image
    src={rightArrow}
    width={20}
    height={30}
    alt='right-arrow'
  />
);

//Css classes
const defaultClass =
  'flex justify-between h-full border-b-[0.2px border-solid border-gray-300 hover:cursor-pointer whitespace-nowrap p-3 gap-20 hover:bg-palette-orange focus:bg-gray-300';
const defaultClassTop = defaultClass + '  rounded-t-[15px]';
const defaultClassBottom = defaultClass + '  rounded-b-[15px]';

const OptionsMenu = ({ setOption }: Props) => {
  const [selected, setSelected] = useState({
    information: true,
    password: false,
    location: false,
    interests: false,
    delete: false,
  });

  //once an option in the settings page is clicked
  const handleOption = async (e: React.MouseEvent<HTMLLIElement>) => {
    for (let option of Object.keys(selected)) {
      //@ts-ignore
      if (selected[option] === true) selected[option] = false;
    }
    const option = e.currentTarget.id;
    setSelected((selected) => ({ ...selected, [option]: true }));
    setOption(option);
  };

  return (
    <ul className='flex flex-col justify-center mr-[100px] shadow-md border-solid border-[0.2px] rounded-[15px] border-gray-300'>
      <li
        className={
          selected.information
            ? defaultClassTop + ' bg-palette-orange'
            : defaultClassTop
        }
        onClick={handleOption}
        id='information'
      >
        Personal information
        {arrowImage}
      </li>
      <li
        className={
          selected.password ? defaultClass + ' bg-palette-orange' : defaultClass
        }
        onClick={handleOption}
        id='password'
      >
        Change your password
        {arrowImage}
      </li>
      <li
        className={
          selected.location ? defaultClass + ' bg-palette-orange' : defaultClass
        }
        onClick={handleOption}
        id='location'
      >
        Update Default Location
        {arrowImage}
      </li>
      <li
        className={
          selected.interests
            ? defaultClass + ' bg-palette-orange'
            : defaultClass
        }
        onClick={handleOption}
        id='interests'
      >
        Update Interests
        {arrowImage}
      </li>
      <li
        className={
          selected.delete
            ? defaultClassBottom + ' bg-palette-orange'
            : defaultClassBottom
        }
        onClick={handleOption}
        id='delete'
      >
        Delete your account
        {arrowImage}
      </li>
    </ul>
  );
};

export default OptionsMenu;
