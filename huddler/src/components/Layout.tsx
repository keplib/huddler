import Navbar from './Navbar-components/Navbar';
import Footer from './Footer';

type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  
  return (
    <>
      <div className='w-full h-screen flex flex-col justify-center' id="carousel">
        <Navbar />
        <div className='self-center h-full w-full mt-24 grid' id="carousel">
          <main>{children}</main>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
export default Layout;

