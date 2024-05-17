import {Link as ListLink} from 'react-router-dom';
import {Box, Container, Grid, Link, Typography} from "@mui/material";
import {routes} from "../../../constants/constantsPage.routes.ts";

export const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: '#0d47a1',
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container maxWidth="lg">

                <Grid container spacing={2}>

                    <Grid container xs={3} flexDirection='column' justifyContent="center" alignItems="center">
                        <Grid>
                            <Link component={ListLink} to={routes.login} variant="body2" color="#FFF">
                                    Home
                            </Link>
                        </Grid>
                        <Grid>
                            <Link component={ListLink} to='#' variant="body2" color="#FFF">
                                    About
                            </Link>
                        </Grid>
                        <Grid>
                            <Link component={ListLink} to='#' variant="body2" color="#FFF">
                                Contact
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container xs={6} flexDirection='column' justifyContent="center" alignItems="center">
                        <Grid item>
                            <Typography variant="h4" color="#FFF">
                                𝓛𝓮𝓽'𝓼 𝓜𝓪𝓴𝓮 𝓜𝓪𝓰𝓲𝓬
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography component="p" color="#FFF">
                                Serving the great Wild West, our teams are based in Portland Oregon, Seattle Washington
                                and Sun Valley (Ketchum) Idaho.
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color="#FFF">
                                We believe that there's not much a dance party won't cure.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container xs={3} flexDirection='column' justifyContent="center" alignItems="center">
                        <Grid item>
                            <Link component={ListLink} to='#' variant="body2" color="#FFF">
                                    Home
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={ListLink} to='#' variant="body2" color="#FFF">
                                    About
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={ListLink} to='#' variant="body2" color="#FFF">
                                Contact
                            </Link>
                        </Grid>

                    </Grid>

                </Grid>

            </Container>
        </Box>
    );
};

export default Footer;
