import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper, CssBaseline, Container} from '@material-ui/core';
import { useForm, FormProvider} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';


import FormInput from '../../CheckoutForm/FormInput';
import makeStyles from './loginFormStyles';
import './loginFormStyles.css'



const LoginForm = () => {

    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const classes = makeStyles();
    const methods = useForm();
    const navigate = useNavigate()

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[userExists, setUserExists] = useState("0");

     const handleClick = (e) => {
         e.preventDefault();
         const user = {username, password};

         fetch("http://localhost:8080/user/checkUser", {
         method: "POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(user),
     }).then(res => res.json())
       .then((result) => {
           console.log(result);
           if(result == 1){
           navigate("/");
           }else{
            setUserExists(result);
           }
       })
     }

    const handleCreateAccount = () => {
        navigate("/create-account-form");
    }

     console.log("USER" + userExists);
  return (
<>
<Container fullWidth>
<div className={classes.toolbar} />
    <Grid item container spacing={12}>
        <Grid xs={12} sm={6} lg={6}>
            <div className={classes.root}>
                <div className = {classes.toolbar} />
                    <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Sign In</Typography>
                    <br />
                    <form className={classes.root} noValidate autoComplete="off">
                    <TextField label="Username/Email" variant='standard' fullWidth 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        style={{paddingBottom: "25px"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <TextField label="Password" variant='standard' fullWidth
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{paddingBottom: "10px"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <Typography variant="body2" align="left" style={{paddingBottom: "15px", marginLeft: "0px"}}>Forgot Password?</Typography>
                    <div style={{paddingBottom: "25px"}}>
                    <Button variant="contained" color="primary" onClick={handleClick} style={{float: "right", transform: "translateY(6px)"}}>
                        Sign In
                    </Button>
                    {userExists == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>User Not Found</Typography> : <></>}
                    </div>
                </form>
            </Paper>
            </div>
        </Grid>

        <Grid xs={12} sm={6} lg={6}>
            <div className={classes.root}>
                <div className = {classes.toolbar} />
                    <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">New User?</Typography>
                    <br />
                    <Typography variant="h5" align="left">Creating an account allows you to:</Typography>
                    <Typography variant="h5" align="left">
                        <ul>
                            <li>Checkout Faster</li>
                            <li>Access Order History</li>
                            <li>Track New Orders</li>
                        </ul>
                    </Typography>
                    <Typography variant="h5" align="left">...and more!</Typography>
                    <div style={{paddingBottom: "48px"}}>
                    <Button variant="contained" color="primary" onClick={handleCreateAccount} style={{float: "right"}}>
                        Create An Account
                    </Button>
                    </div>
            </Paper>
            </div>
        </Grid>
    </Grid>
</Container>
</>
)
}

export default LoginForm