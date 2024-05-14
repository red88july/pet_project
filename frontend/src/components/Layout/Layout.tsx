import {PropsWithChildren} from 'react';
import AppToolbar from '../UI/AppToolbar/AppToolbar';
import Footer from "../UI/Footer/Footer.tsx";

const Layout: React.FC<PropsWithChildren> = ({children}) => {

    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <main>
                {children}
            </main>
            <footer>
              <Footer />
            </footer>
        </>
    );
};

export default Layout;