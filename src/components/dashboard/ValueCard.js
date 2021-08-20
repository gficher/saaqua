import PropTypes from 'prop-types';

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Icon
} from '@material-ui/core';

function ValueCard(props) {
  const {
    title, value, icon, color
  } = props;

  return (
    <Card
      sx={{ height: '100%' }}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {title || 'Title'}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {value || 'Value'}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: color || 'success.main',
                height: 56,
                width: 56
              }}
            >
              <Icon>{icon || 'star'}</Icon>
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ValueCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};

export default ValueCard;
