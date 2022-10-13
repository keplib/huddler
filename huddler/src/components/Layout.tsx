import Navbar from './Navbar-components/Navbar';
import Footer from './Footer';

type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center'>
        <Navbar />
        <div className='self-center bg-palette-light h-full w-full mt-24'>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Layout;

