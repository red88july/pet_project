import { PropsWithChildren } from 'react';
import AppToolbar from '../UI/AppToolbar/AppToolbar';

const Layout:React.FC<PropsWithChildren> = ({children}) => {

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        {children}
      </main>
        <footer>
            <h1>Footer</h1>
        </footer>
    </>
  );
};

export default Layout;