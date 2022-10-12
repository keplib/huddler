import Navbar from './Navbar-components/Navbar';
import Footer from './Footer';

type Props = {
  children: JSX.Element;
};

function Layout({ children }: Props) {
  return (
    <div className='w-full h-screen bg-red-200 flex flex-col justify-center'>
      <Navbar />
      <div className='self-center bg-slate-200 h-full w-full mt-24'>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
