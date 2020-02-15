import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progressDiv:{
        
        
    },
    progress: {
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    }
});

const CircularIndeterminate = (props) => {
    const { classes } = props;
    return (
    <div className={classes.progressDiv}>
      <CircularProgress 
      size={props.size}
      color='primary'
      variant="indeterminate"
      className={classes.progress} />

    </div>
  );
}

export default withStyles(styles)(CircularIndeterminate);