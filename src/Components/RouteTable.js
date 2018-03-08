import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';

// Columns data lap model
const columnDataLap = [
  { id: 'startTime', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'intensity', numeric: false, disablePadding: true, label: 'Intensity' },
  { id: 'totalTime', numeric: true, disablePadding: true, label: 'Time (s)' },
  { id: 'distance', numeric: true, disablePadding: true, label: 'Distance (m)' },
  { id: 'avgSpeed', numeric: true, disablePadding: true, label: 'Avg. Speed (m/s)' },
  { id: 'avgBpm', numeric: true, disablePadding: true, label: 'Avg. Bpm' },
  { id: 'maxSpeed', numeric: true, disablePadding: true, label: 'Max. Speed (m/s)' },
  { id: 'maxBpm', numeric: true, disablePadding: true, label: 'Max. Bpm' },
  { id: 'cal', numeric: true, disablePadding: false, label: 'Cal.' },
];

// Columns data trackpoint model
const columnDataTrackpoint = [
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'latitude', numeric: true, disablePadding: true, label: 'Latitude (degrees)' },
  { id: 'longitude', numeric: true, disablePadding: true, label: 'Longitude (degrees)' },
  { id: 'altitude', numeric: true, disablePadding: true, label: 'Altitude (m)' },
  { id: 'distance', numeric: true, disablePadding: true, label: 'Distance (g)' },
  { id: 'speed', numeric: true, disablePadding: true, label: 'Speed (m/s)' },
  { id: 'heartRate', numeric: true, disablePadding: true, label: 'Heart Rate (bpm)' },
];


class RouteTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnDataLap.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

RouteTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.75),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 80%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let RouteTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title">Laps</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => props.handleRemoveLaps()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

RouteTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

RouteTableToolbar = withStyles(toolbarStyles)(RouteTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 400,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

// Create lap data row
function createDataLaps(counter, startTime, totalTime, distance, maxSpeed, avgSpeed, maxBpm, avgBpm, cal, intensity) {
  return { id: counter, intensity, startTime, totalTime, distance, avgSpeed, avgBpm, maxSpeed, maxBpm, cal };
}

// Create trackpoint data row
function createDataTrackPoint(counter, date, latitude, longitude, altitude, distance, speed, heartRate) {
  return { id: counter, date, latitude, longitude, altitude, distance, speed, heartRate };
}

class RouteTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createDataLaps = this.createDataLaps.bind(this);
    this.createDataTrackpoint = this.createDataTrackpoint.bind(this);
    this.counterLaps = 0;
    this.counterTrackpoints = 0;
    this.state = {
      order: 'asc',
      orderBy: 'startTime',
      selected: [],
      dataSelected: [],
      data: this.createDataLaps(props.laps),
      page: 0,
      rowsPerPage: 5,
    };
  }

  createDataLaps(laps){
    return laps.map(lap =>
        createDataLaps(++this.counterLaps, lap.startTime, lap.totalTime, lap.distance, lap.maxSpeed, lap.avgSpeed,
          lap.maxBpm, lap.avgBpm, lap.cal, lap.intensity)
        )
  }

  createDataTrackpoint(lap){
      return lap.tracks.map(track => 
        createDataTrackPoint(++this.counterTrackpoints, track.date, track.position.lat, track.position.lng, 
          track.alt,track.dist, track.speed, track.bpm)
      )
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.laps!==this.props.laps){
      this.counterLaps = 0;
      this.counterTrackpoints = 0;
      this.setState({
        data: this.createDataLaps(nextProps.laps)
      });
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected, dataSelected } = this.state;
    const selectedIndex = selected.indexOf(id);

    let indexLap = id - 1;
    let startTime = this.state.data[indexLap].startTime;
    let objectSelected = {indexLap,startTime};
    const selectDataIndex = dataSelected.indexOf(objectSelected);

    let newSelected = [];
    let newDataSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newDataSelected = newDataSelected.concat(dataSelected, objectSelected);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newDataSelected = newDataSelected.concat(dataSelected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newDataSelected = newDataSelected.concat(dataSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newDataSelected = newDataSelected.concat(
        dataSelected.slice(0, selectDataIndex),
        dataSelected.slice(selectDataIndex + 1),
      );
    }

    this.setState({ selected: newSelected, dataSelected: newDataSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  removeLaps = () => {
    this.props.handleRemoveLaps(this.state.dataSelected);
    this.setState({ selected: [], dataSelected: []});
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <RouteTableToolbar handleRemoveLaps={this.removeLaps} numSelected={selected.length}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <RouteTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>

                    <TableCell padding="none" >{n.startTime?new Date(n.startTime).toLocaleTimeString():n.id}</TableCell>
                    <TableCell padding="none" >{n.intensity?n.intensity:'-'}</TableCell>
                    <TableCell padding="none" numeric>{n.totalTime?(Math.round(n.totalTime * 100) / 100):'-'}</TableCell>
                    <TableCell padding="none" numeric>{n.distance?(Math.round(n.distance * 100) / 100):'-'}</TableCell>
                    <TableCell padding="none" numeric>{n.avgSpeed?(Math.round(n.avgSpeed * 100) / 100):'-'}</TableCell>
                    <TableCell padding="none" numeric>{n.avgBpm?Math.round(n.avgBpm*100)/100:'-'}</TableCell>
                    <TableCell padding="none" numeric>{n.maxSpeed?(Math.round(n.maxSpeed * 100) / 100) : '-'}</TableCell>
                    <TableCell padding="none" numeric>{n.maxBpm?n.maxBpm:'-'}</TableCell>
                    <TableCell numeric>{n.cal?n.cal:'-'}</TableCell>
                    
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={10}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

RouteTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RouteTable);