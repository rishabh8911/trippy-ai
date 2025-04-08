import Header from './components/ui/custom/Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
