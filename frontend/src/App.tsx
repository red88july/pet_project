import Layout from "./components/Layout/Layout";
import {Box, Container} from "@mui/material";
import PageNoFoundPicture from '../src/assets/images/404PageNotFound.jpg';
import {Route, Routes} from "react-router-dom";
import {routes} from "./constants/constantsPage.routes.ts";
import RegisterForm from "./features/users/RegisterForm.tsx";
import LoginForm from "./features/users/LoginForm.tsx";
import Occasion from "./features/occasion/Occasion.tsx";
import OccasionForm from "./features/occasion/components/OccasionForm.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import UpdateForm from "./features/occasion/components/UpdateForm.tsx";
import {serverRoutes} from "./constants/constantsServer.routes.ts";
import OccasionCategory from "./features/occasion/OccasionCategory.tsx";

function App() {
    const user = useAppSelector(selectUser);

    return (
        <>
            <Layout>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path={routes.home} element={(<Occasion/>)}/>
                        <Route path={routes.register} element={<RegisterForm/>}/>
                        <Route path={routes.login} element={<LoginForm/>}/>
                        <Route path={routes.occasionForm} element={
                            <ProtectedRoute isAllowed={user && (user.role === 'speaker' || user.role === 'manager' || user.role === 'admin')}>
                                <OccasionForm/>
                            </ProtectedRoute>
                        }/>
                        <Route path={serverRoutes.occasionUpdate} element={
                            <ProtectedRoute isAllowed={user && (user.role === 'speaker' || user.role === 'manager' || user.role === 'admin')}>
                                <UpdateForm />
                            </ProtectedRoute>
                        }/>
                        <Route path='/occasion' element={
                                <OccasionCategory />
                        }/>
                        <Route path="*" element={(
                            <Box
                                sx={{
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', marginTop: '50px'
                                }}>
                                <Box component="img"
                                     sx={{width: '50rem', height: '50rem'}}
                                     src={PageNoFoundPicture}
                                     alt="Page Not Found"/>
                            </Box>
                        )}/>
                    </Routes>
                </Container>
            </Layout>
        </>
    )
}

export default App;