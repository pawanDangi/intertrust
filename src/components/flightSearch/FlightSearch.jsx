import React, { Component } from 'react';
import FlightSearchHeader from './FlightSearchHeader';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import {
  Paper
} from '@material-ui/core/';
import { setFlights } from '../../actions'
import FlightType from './FlightType';
import FlightRoute from './FlightRoute';
import SearchResult from './SearchResult';

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
    fetch('https://gist.githubusercontent.com/pawanDangi/d876630ecaefd97d84c910fcb0b4b7db/raw/5bdc59dc95e68ad2cc04ae65222c821c8cab90f2/flights.json')
    .then(res => res.json())
    .then(flights => {
      this.props.setFlights(flights);
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentWillReceiveProps (nextProps) {
    // const { searchData } = nextProps;
  }

  render() {
    const { classes, searchData } = this.props;
    const header = 'Search Flights';
    const title = 'Book Domestic and International flights';
    return (
      <div>
        <FlightSearchHeader header={header} title={title} />
        <Paper className={classes.paper} elevation={1}>
          <FlightType />
          <FlightRoute />
          {searchData && Object.keys(searchData).length ? <SearchResult searchData={searchData} /> : ''}
        </Paper>
      </div>
    );
  }
}

FlightSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  searchData: state.searchData
})

const mapDispatchToProps = dispatch => ({
  setFlights: flights => dispatch(setFlights(flights))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FlightSearch));
