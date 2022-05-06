import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper, CssBaseline, Container} from '@material-ui/core';
import { useForm, FormProvider} from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';


import makeStyles from './confirmationStyles';

const Confirmation = () => {

    const classes = makeStyles();
    const params = useParams();
    console.log(params.email);

  return (
    <Container style = {{width: "60%"}}>
<div className={classes.toolbar} />
            <div className={classes.root}>
                <div className = {classes.toolbar} />
                    <Paper className={classes.paper}>
                    <Typography variant="h3" align="center">Confirmation</Typography>
                    <br />
                    <Typography variant="h4" align="center" style={{paddingBottom:"10px"}}>A confirmation email has been sent to:</Typography>
                    <Typography variant="h4" align="center" style={{paddingBottom:"25px"}}>{params.email}</Typography>
                    <Typography variant="h5" align="center" style={{paddingBottom:"5px"}}>Please check your email and follow the link that was sent to verify your account.</Typography>
            </Paper>
            </div>
</Container>
  )
}

export default Confirmation