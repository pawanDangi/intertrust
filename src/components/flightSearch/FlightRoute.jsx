import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Button
} from '@material-ui/core/';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { setSearchData } from '../../actions';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  datePicker: {
    position: 'relative',
    'box-sizing': 'border-box'
  },
  inputDate: {
    'font-size': '13px',
    'border-radius': '4px',
    'box-shadow': 'inset 0 2px 2px #e9e9e9',
    border: '1px solid #aeaeae',
    'line-height': '16px',
    padding: '6px 10px 5px'
  },
  searchButton: {
    margin: theme.spacing.unit * 3,
  },
  passengers: {
    width: '80%'
  }
});

class FlightRoute extends Component {
  state = {
    flightFrom: null,
    flightTo: null,
    depart: moment(),
    returnFlight: moment().add(1, 'days'),
    startDate: moment(),
    flightClass: {label: 'Economy', value: 'economy'},
    classType: [{label: 'Economy', value: 'economy'}, {label: 'Business', value: 'business'}, {label: 'First', value: 'first'}],
    passengers: 1
  }

  handleFromChange = flightFrom => {
    this.setState({flightFrom})
  }

  handleToChange = flightTo => {
    this.setState({flightTo})
  }

  handleDepartChange = depart => {
    this.setState({depart})
  }

  handleReturnChange = returnFlight => {
    this.setState({returnFlight})
  }

  handleClassChange = flightClass => {
    this.setState({flightClass})
  }

  handlePassengersChange = event => {
    this.setState({passengers: event.target.value})
  }

  flightsFilter = (flights, remove) => {
    if (!remove) return flights;
    return flights.filter(f => f.code !== remove.code)
  }

  searchFlight = () => {
    const {
      flightFrom,
      flightTo,
      depart,
      returnFlight,
      passengers,
      flightClass
    } = this.state;
    const { flightType } = this.props;
    let searchData = {
      flightFrom,
      flightTo,
      depart,
      returnFlight,
      passengers,
      flightClass,
      flightType
    }
    this.props.setSearchData(searchData)
  }

  select = (value, onChange, options, isSearchable) => {
    return (
      <Select
        value={value}
        onChange={onChange}
        options={options}
        isSearchable={isSearchable}
      />
    )
  }

  getInputFields = () => {
    const {
      flightFrom,
      flightTo,
      depart,
      startDate,
      flightClass,
      classType,
      returnFlight,
      passengers
    } = this.state;
    let { flights, classes, flightType } = this.props;
    flights = flights.map(f => {
      f.value = f.code;
      f.label = `${f.name}, ${f.city}(${f.code})`;
      return f;
    })
    return (
      <div className="row">
        <div className="col-sm-3">
          <div>From*</div>
          <div>
            {this.select(flightFrom, this.handleFromChange, this.flightsFilter(flights, flightTo), true)}
          </div>
        </div>
        <div className="col-sm-3">
          <div>To*</div>
          <div>
            {this.select(flightTo, this.handleToChange, this.flightsFilter(flights, flightFrom), true)}
          </div>
        </div>
        <div className="col-sm-2">
          <div>
            <div>Depart*</div>
            <div>
              <div className={classes.datePicker}>
                <DatePicker
                  selected={depart}
                  onChange={this.handleDepartChange}
                  minDate={startDate}
                  className={classes.inputDate}
                />
              </div>
            </div>
          </div>
          {
            flightType === 'roundTrip' ?
            <div>
              <div>Return*</div>
              <div>
                <div className={classes.datePicker}>
                  <DatePicker
                    selected={returnFlight}
                    onChange={this.handleReturnChange}
                    minDate={moment(depart).add(1, 'days')}
                    className={classes.inputDate}
                  />
                </div>
              </div>
            </div>
            : ''
          }
        </div>
        <div className="col-sm-1">
          <div>Passengers*</div>
          <div>
            <input
              className={classes.passengers}
              type="number"
              name="passengers"
              value={passengers}
              onChange={this.handlePassengersChange}
            />
          </div>
        </div>
        <div className="col-sm-3">
          <div>Class*</div>
          <div>
            {this.select(flightClass, this.handleClassChange, classType, false)}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { flights, classes } = this.props;
    const {
      flightFrom,
      flightTo,
      passengers
    } = this.state;

    return (
      <div>
        {
          flights && (flights.length < 1) ?
          <CircularProgress className={classes.progress} size={50} /> :
          <div>
            {this.getInputFields()}
            <div>
              <Button
                variant="contained"
                color="secondary"
                className={classes.searchButton}
                disabled={!(flightFrom && flightTo && passengers)}
                onClick={this.searchFlight}
              >
                Search
              </Button>
            </div>
          </div>
        }
      </div>
    );
  }
}

FlightRoute.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  flights: state.flights,
  flightType: state.flightType
})

const mapDispatchToProps = dispatch => ({
  setSearchData: searchData => dispatch(setSearchData(searchData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FlightRoute));
