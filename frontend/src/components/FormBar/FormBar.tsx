import React from 'react';
import { NavLink } from 'react-router-dom';

import {Box, Button, Container} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '../../app/hooks.ts';
import {selectUser} from "../../features/users/usersSlice.ts";
import {routes} from "../../constants/constantsPage.routes.ts";

const FormBar: React.FC = () => {
  const user = useAppSelector(selectUser);
  return (
      <Container maxWidth="lg">
        <Box marginTop={10}>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
            <Box>
              {user && (
                  <Box maxWidth="700px" display="flex" justifyContent="flex-start" alignItems="center">
                    <h2>{user?.username} <em>Welcome to Guru-planner application!</em></h2>
                  </Box>
              )}
            </Box>
            <Box display="flex" gap={1}>
              <Button
                  variant="contained"
                  color="primary"
                  component={NavLink}
                  to={routes.occasionForm}
                  startIcon={<AddIcon/>}>
                Добавить мероприятие
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
  );
};

export default FormBar;