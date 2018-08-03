import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress
} from '@material-ui/core/';
import Select from 'react-select';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  }
});

class FlightRoute extends Component {
  state = {
    flightFrom: null,
    flightTo: null
  }

  handleFromChange = flightFrom => {
    this.setState({flightFrom: flightFrom})
  }

  getInputFields = () => {
    const { flightFrom } = this.state;
    let { flights } = this.props;
    flights = flights.map(f => {
      f.label = `${f.city}, ${f.code}`;
      return f;
    })
    return (
      <div className="row">
        <div className="col-sm-3">
          <div>From</div>
          <div>
            <Select
              value={flightFrom}
              onChange={this.handleFromChange}
              onKeyDown={this.handleFromSearch}
              options={flights}
            />
          </div>
        </div>
        <div className="col-sm-3">To</div>
        <div className="col-sm-3">Depart</div>
        <div className="col-sm-3">Class</div>
      </div>
    )
  }

  render() {
    const { flights, classes } = this.props;
    return (
      <div>
        {
          flights && (flights.length < 1) ?
          <CircularProgress className={classes.progress} size={50} /> :
          this.getInputFields()
        }
      </div>
    );
  }
}

FlightRoute.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  flights: state.flights
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FlightRoute));
