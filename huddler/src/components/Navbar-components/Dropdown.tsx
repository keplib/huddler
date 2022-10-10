import Link from 'next/link';
import { useRouter } from 'next/router';
const serviceDropdown = [
  { name: 'Profile', path: '/profile' },
  { name: 'Settings', path: '/settings' },
  { name: 'New Huddle', path: '/create' },
  { name: 'Log Out', path: '/' },
];

type Props = {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown = ({ setShowDropDown }: Props) => {
  const router = useRouter();

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // some function from authentication logout
    console.log('hit hereeee');
    router.replace('/');
  };

  return (
    <div
      className='mt-24 w-full'
      onMouseLeave={() => setShowDropDown(false)}
    >
      <ul className='grid grid-cols-3 gap-4 border-b w-48 absolute bg-black -right-[50%] place-content-center pt-2 text-lg'>
        {serviceDropdown.map((menuItem, i) => {
          return (
            <li
              className='col-span-3 border-b p-4'
              key={i}
            >
              {menuItem.name === 'Log Out' ? (
                <Link href=''>
                  <a onClick={(e) => handleLogoutClick(e)}>{menuItem.name}</a>
                </Link>
              ) : (
                <Link href={menuItem.path}>{menuItem.name}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;




