import { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { toast } from 'react-toastify';

const AccountProfileDetails = (props) => {
  const { user } = props;

  const [values, setValues] = useState({
    name: 'Katarina',
    username: 'admin',
    birthdate: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          title="Minha conta"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nome"
                name="name"
                onChange={handleChange}
                required
                value={user.name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Usuário"
                name="username"
                onChange={handleChange}
                required
                value={user.username}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nascimento"
                name="birthdate"
                onChange={handleChange}
                required
                type="date"
                value={moment(user.birth).format('YYYY-MM-DD')}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

AccountProfileDetails.propTypes = {
  user: PropTypes.object
};

export default AccountProfileDetails;
