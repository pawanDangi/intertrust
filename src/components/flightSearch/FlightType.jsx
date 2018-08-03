import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core/';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    display: 'inline'
  }
});

class FlightType extends Component {
  state = {
    value: 'oneWay',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Type"
            name="flightType"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="oneWay" control={<Radio />} label="One Way" />
            <FormControlLabel value="roundTrip" control={<Radio />} label="Round Trip" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

FlightType.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightType);
