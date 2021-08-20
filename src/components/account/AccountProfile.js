import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Icon
} from '@material-ui/core';

const user = {
  name: 'Leonardo Pinhati'
};

const AccountProfile = (props) => (
  <Card {...props}>
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
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          leopinhati
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);

export default AccountProfile;
