import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Home from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    toolbar:{
       flexGrow: 1
    },
    grow:{
        flexGrow: 1
    }
}

const Navbar = (props) => {
    const { classes } = props
    return (
        <div>
            <AppBar position="sticky">
                <Toolbar className={classes.toolbar}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <IconButton color="inherit" aria-label="Menu">
                            <Home />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        TNP-DYNAMIC-PRICING
                    </Typography>
                    {/* <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link to="/About" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color="inherit">About us</Button>
                    </Link> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Navbar);