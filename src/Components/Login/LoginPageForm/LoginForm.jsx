import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper, CssBaseline, Container} from '@material-ui/core';
import { useForm, FormProvider} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';


import FormInput from '../../CheckoutForm/FormInput';
import makeStyles from './loginFormStyles';
import './loginFormStyles.css'



const LoginForm = () => {

    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const classes = makeStyles();
    const methods = useForm();

    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [students, setStudents] = useState([]);

     const handleClick = (e) => {
         e.preventDefault();
         const student = {name, address};
         console.log(student);

         fetch("http://localhost:8080/student/add", {
         method: "POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(student),
     }).then(() => {
         console.log(student);
     })
     }

     useEffect(() => {
         fetch("http://localhost:8080/student/getAll")
         .then(res => res.json())
         .then((result) => {
             setStudents(result);
         })
     })


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
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        style={{paddingBottom: "25px"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <TextField label="Password" variant='standard' fullWidth
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                        style={{paddingBottom: "10px"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <Typography variant="body2" align="left" style={{paddingBottom: "15px", marginLeft: "0px"}}>Forgot Password?</Typography>
                    <div style={{paddingBottom: "25px"}}>
                    <Button variant="contained" color="primary" onClick={handleClick} style={{float: "right", transform: "translateY(6px)"}}>
                        Sign In
                    </Button>
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
                    <Button variant="contained" color="primary" onClick={handleClick} style={{float: "right"}}>
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