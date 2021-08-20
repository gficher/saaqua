import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import useAuth from 'src/useAuth';

const Account = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_URL}/user/${auth.user_id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Account | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              {user && (<AccountProfile user={user} />)}
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              {user && (<AccountProfileDetails user={user} />)}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
