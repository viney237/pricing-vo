import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ImportExport, ShowChart, Score } from '@material-ui/icons'

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    marginTop: '30px',
    width: '35%',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto'

  },
  link: {
    display: 'flex',
    textDecoration: 'none'
  },
  icon: {
    marginRight: theme.spacing.unit / 2,
    width: 20,
    height: 20,
  },
});

function IconBreadcrumbs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Breadcrumbs arial-label="Breadcrumb">
        <Link color="inherit" to="/" className={classes.link}>
          <ShowChart className={classes.icon} />
          Analysed Data
        </Link>
        <Link color="inherit" to="/ImportData" className={classes.link}>
          <ImportExport className={classes.icon} />
          Import Data
        </Link>
        <Link color="inherit" to="/InputForm" className={classes.link}>
          <Score className={classes.icon} />
          Predict Price
        </Link>
      </Breadcrumbs>
    </Paper>
  );
}

IconBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconBreadcrumbs);
