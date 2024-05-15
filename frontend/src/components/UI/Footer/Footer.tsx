import {Link as ListLink} from 'react-router-dom';
import {Box, Container, Link, Typography} from "@mui/material";
import {routes} from "../../../constants/constantsPage.routes.ts";

export const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: '#0d47a1',
                paddingTop: "1rem",
                paddingBottom: "1rem",
                // marginTop: "230px",
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{display: 'flex', direction: "row", alignItems: "center", justifyContent: "center"}}>
                    <Box sx={{display: 'flex', direction: "column", alignItems: "center", justifyContent: "center"}}>
                        <Link component={ListLink} to={routes.login} variant="body2" color="#FFF">
                            <Typography>
                                Home
                            </Typography>
                        </Link>
                        <Link component={ListLink} to='#' variant="body2" color="#FFF">
                            <Typography>
                                About
                            </Typography>
                        </Link>
                        <Link component={ListLink} to='#' variant="body2" color="#FFF">
                            Contact
                        </Link>
                    </Box>
                    <Box sx={{display: 'flex', direction: "column", alignItems: "center", justifyContent: "center",   borderLeft: "2px solid #FFFF",
                        borderRight:"2px solid #FFFF",
                        paddingLeft: "10px",
                        paddingRight: "10px"}}>
                        <Typography variant="h4" color="#FFF">
                            𝓛𝓮𝓽'𝓼 𝓜𝓪𝓴𝓮 𝓜𝓪𝓰𝓲𝓬
                        </Typography>
                        <Typography component="p" color="#FFF">
                            Serving the great Wild West, our teams are based in Portland Oregon, Seattle Washington
                            and Sun Valley (Ketchum) Idaho.
                        </Typography>
                        <Typography color="#FFF">
                            We believe that there's not much a dance party won't cure.
                        </Typography>
                    </Box>
                    <Box sx={{alignItems: "center", justifyContent: "center"}}>
                        <Link component={ListLink} to='#' variant="body2">
                            <Typography>
                                Home
                            </Typography>
                        </Link>
                        <Link component={ListLink} to='#' variant="body2">
                            <Typography>
                                About
                            </Typography>
                        </Link>
                        <Link component={ListLink} to='#' variant="body2">
                            Contact
                        </Link>
                    </Box>
                </Box>
            </Container>
        // </Box>
    );
};

export default Footer;
