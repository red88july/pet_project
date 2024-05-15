import {PropsWithChildren} from 'react';
import AppToolbar from '../UI/AppToolbar/AppToolbar';
import Footer from "../UI/Footer/Footer.tsx";
import {Box} from "@mui/material";
import footer from "../UI/Footer/Footer.tsx";

const Layout: React.FC<PropsWithChildren> = ({children}) => {

    return (
        <>
            <header>
                <AppToolbar/>
            </header>
            <main>
                {children}
            </main>
            <Box component={footer}>
                <Footer />
            </Box>
        </>
    );
};

export default Layout;