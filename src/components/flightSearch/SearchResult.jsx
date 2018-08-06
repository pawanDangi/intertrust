import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core/';
import moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SearchResult (props) {
  const { classes, searchData } = props;

  return (
    <Paper className={classes.root}>
      <div>
        <h2>Search Data</h2>
      </div>
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Depart</TableCell>
              {
                searchData.flightType === 'roundTrip' ? <TableCell>Return</TableCell> : null
              }
              <TableCell>Passengers</TableCell>
              <TableCell>Class</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell  component="th" scope="row">
                <span>{searchData.flightFrom.label}</span>
              </TableCell>
              <TableCell>
                <span>{searchData.flightTo.label}</span>
              </TableCell>
              <TableCell>
                <span>{moment(searchData.depart).format('MM/DD/YYYY')}</span>
              </TableCell>
              {
                searchData.flightType === 'roundTrip' ? <TableCell><span>{moment(searchData.returnFlight).format('MM/DD/YYYY')}</span></TableCell> : null
              }
              <TableCell>
                <span>{searchData.passengers}</span>
              </TableCell>
              <TableCell>
                <span>{searchData.flightClass.label}</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResult);
