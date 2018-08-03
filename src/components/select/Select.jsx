import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  Select
} from '@material-ui/core/';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    fontSize: 16,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  }
});

class FlightRoute extends Component {
  state = {
    flightFrom: '',
    flightTo: ''
  };

  handleFromChange = flightFrom => {
    console.log(flightFrom)
  }

  Option = props => {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }

  inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
  }

  Control = props => {
    const { inputComponent } = this
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            ref: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
      />
    );
  }

  NoOptionsMessage = props => {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }

  Placeholder = props => {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }

  SingleValue = props => {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }

  ValueContainer = props => {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }

  components = () => {
    const {
      Option, Control, NoOptionsMessage, Placeholder, SingleValue, ValueContainer
    } = this;
    return {
      Option,
      Control,
      NoOptionsMessage,
      Placeholder,
      SingleValue,
      ValueContainer
    }
  }

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  selectSearch = (options, value, text) =>{
    return (
      <Select
        options={options}
        components={this.components()}
        value={value}
        onChange={this.handleChange(text)}
        placeholder="From"
      />
    )
  }

  getInputFields = (classes = {}, flights = [], flightFrom = '', flightTo = '') => {
    return (
      <div className="row">
        <div className="col-sm-3">
          {this.selectSearch(flights, flightFrom, 'flightFrom')}
        </div>
        <div className="col-sm-3">To</div>
        <div className="col-sm-3">Depart</div>
        <div className="col-sm-3">Class</div>
      </div>
    )
  }

  render() {
    const { flights, flightFrom, flightTo, classes } = this.props;
    return (
      <div>
        {
          flights && (flights.length < 1) ?
          <CircularProgress className={classes.progress} size={50} /> :
          this.getInputFields(classes, flights, flightFrom, flightTo)
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
