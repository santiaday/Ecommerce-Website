import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper, CssBaseline, Container} from '@material-ui/core';
import { useForm, FormProvider} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';


import makeStyles from './passwordResetPageStyles';

const PasswordResetPage = () => {

    const classes = makeStyles();

    const[email, setEmail] = useState("");

    const handleClick = () => {
        fetch("http://localhost:8080/user/resetPassword", {
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(email)
     }).then(result => result.json())
        .then((result) => {
            console.log(result);
        })
    }

  return (
      
<>
<Container style = {{width: "60%"}}>
<div className={classes.toolbar} />
            <div className={classes.root}>
                <div className = {classes.toolbar} />
                    <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Reset Password</Typography>
                    <Typography variant="h5" align="center">Please input the email address associated with your account to receive a password reset link.</Typography>
                    <br />
                    <form className={classes.root} noValidate style={{textAlign:"center", maxWidth:"100%"}} autocomplete="off">
                    <TextField label="Email Address" variant='standard' fullWidth required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        style={{paddingBottom: "25px", display:"inline-flex"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <div style={{paddingBottom: "0px"}}>
                    <Button variant="contained" type='submit' color="primary" onClick={handleClick} style={{transform: "translateY(20px)"}}>
                        Send Link
                    </Button>
                    </div>
                </form>
            </Paper>
            </div>
</Container>
</>
  )
}

export default PasswordResetPage