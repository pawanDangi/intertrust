import React, { Component } from 'react';
import FlightSearchHeader from './FlightSearchHeader';
import FlightType from './FlightType';
import FlightRoute from './FlightRoute';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import {
  Paper
} from '@material-ui/core/';
import { setFlights } from '../../actions'

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  }
});

class FlightSearch extends Component {
  componentDidMount () {
    fetch('https://gist.githubusercontent.com/pawanDangi/d876630ecaefd97d84c910fcb0b4b7db/raw/a5f29795f5e02bb86d187f15d85d03849a2cbd07/flights.json')
    .then(res => res.json())
    .then(flights => {
      this.props.setFlights(flights);
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { classes } = this.props;
    const header = 'Search Flights';
    const title = 'Book Domestic and International flights';

    return (
      <div>
        <FlightSearchHeader header={header} title={title} />
        <Paper className={classes.paper} elevation={1}>
          <FlightType />
          <FlightRoute />
        </Paper>
      </div>
    );
  }
}

FlightSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  setFlights: flights => dispatch(setFlights(flights))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FlightSearch));
