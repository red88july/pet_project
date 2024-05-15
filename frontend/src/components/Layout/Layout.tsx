import {PropsWithChildren} from 'react';
import AppToolbar from '../UI/AppToolbar/AppToolbar';
import Footer from "../UI/Footer/Footer.tsx";
import {Container} from "@mui/material";

const Layout: React.FC<PropsWithChildren> = ({children}) => {

    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container
                    maxWidth="lg"
                    component="main"
                    sx={{ minHeight: '100vh', pt: 4, mb: 4 }}>
                {children}
                </Container>
            </main>
            <footer>
              <Footer />
            </footer>
        </>
    );
};

export default Layout;