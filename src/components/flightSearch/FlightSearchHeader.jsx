import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography
} from '@material-ui/core/';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'rgb(18, 70, 128)',
    textAlign: 'center'
  },
  typography: {
    ...theme.mixins.gutters(),
    color: '#fff'
  }
});

class FlightSearchHeader extends Component {
  render() {
    const { classes, header, title } = this.props;

    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          <Typography className={classes.typography} variant="headline" component="h3">
            {header}
          </Typography>
          <Typography className={classes.typography} component="p">
            {title}
          </Typography>
        </Paper>
      </div>
    );
  }
}

FlightSearchHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightSearchHeader);
