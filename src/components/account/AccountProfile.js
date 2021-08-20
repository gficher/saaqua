import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Icon
} from '@material-ui/core';

const AccountProfile = (props) => {
  const { user } = props;

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            sx={{
              height: 100,
              width: 100
            }}
          >
            <Icon style={{ fontSize: 60 }}>face</Icon>
          </Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
            mt={2}
          >
            { user.name }
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            { user.login }
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

AccountProfile.propTypes = {
  user: PropTypes.object
};

export default AccountProfile;
