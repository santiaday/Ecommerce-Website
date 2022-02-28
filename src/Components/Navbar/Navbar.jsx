import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

   
  return (
    <>
        <AppBar style={{ height: '90px'}} position="fixed" className={classes.appBar} color="primary" >
            <Toolbar >
            <div className={classes.grow} />
                <Typography component = { Link } to="/" className={classes.grow} color="inherit">
                    <img src={'jeanLogo.png'} alt="excellent store inc" height="70px"  />
                </Typography>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar