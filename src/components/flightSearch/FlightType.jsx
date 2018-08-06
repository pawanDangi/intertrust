import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core/';

import { setFlightType, setSearchData } from '../../actions';

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
  componentDidMount () {
    this.props.setFlightType('oneWay');
  }

  handleChange = event => {
    this.props.setFlightType(event.target.value);
    this.props.setSearchData({});
  };

  render() {
    const { classes, flightType } = this.props;

    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Type"
            name="flightType"
            className={classes.group}
            value={flightType}
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

const mapStateToProps = state => ({
  flightType: state.flightType
})

const mapDispatchToProps = dispatch => ({
  setFlightType: flightType => dispatch(setFlightType(flightType)),
  setSearchData: searchData => dispatch(setSearchData(searchData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FlightType));
