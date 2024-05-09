import Layout from "./components/Layout/Layout";
import {Box, Container} from "@mui/material";
import PageNoFoundPicture from '../src/assets/images/404PageNotFound.jpg';
import {Route, Routes} from "react-router-dom";
import {routes} from "./constants.routes.ts";

function App() {
  return (
    <>
     <Layout>
         <Container maxWidth="xl">
             <Routes>
                 <Route path={routes.home} element={(<h1>Home page</h1>)}/>
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

export default App
