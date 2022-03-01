import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Grid } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import useStyles from './styles';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();

   
  return (
    <>
        <AppBar style={{ height: '90px'}} position="fixed" className={classes.appBar} color="primary" >
            <Toolbar>
            <Grid container justify="space-between" >  
                <Typography inline variant="body1" align="left"></Typography>
                <Typography inline variant="body1" align="center" component = { Link } to="/" className={classes.grow}>
                    <img src={'jeanLogo.png'} alt="excellent store inc" height="80px" position="absolute" align/>
                </Typography>
                <Typography inline variant="body1" className={classes.title} align="center">
                <Badge badgeContent={totalItems} className={classes.badge} component={Link} to="/cart" aria-label="Show cart items" style={{ fontSize: "50px" , width: "50" , bottom:"10px", position:"absolute", right:"30px"}}>
                    <ShoppingCartOutlined style={{ fontSize: "50px" , width: "50", color: "#FFFFFF"}} color="cart" />
                </Badge>
                </Typography>
            </Grid>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar