import React, {PropsWithChildren} from 'react';
import AppToolbar from '../UI/AppToolbar/AppToolbar';
import Footer from "../UI/Footer/Footer.tsx";
import {Box, Container} from "@mui/material";
import {useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../../features/users/usersSlice.ts";
import FormBar from "../FormBar/FormBar.tsx";
import CategoryMenu from "../CategoryMenu/CategoryMenu.tsx";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header>
                <AppToolbar/>
                <CategoryMenu/>
            </header>
            <main>
                <Container
                    maxWidth="lg"
                    component="main"
                    sx={{minHeight: '100vh', mb: 4}}>
                    <Box>{user && (<FormBar/>)}</Box>
                    {children}
                </Container>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
};

export default Layout;
