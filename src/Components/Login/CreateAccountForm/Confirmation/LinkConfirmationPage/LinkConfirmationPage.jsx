import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper, CssBaseline, Container} from '@material-ui/core';
import { useForm, FormProvider} from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';


import makeStyles from './linkConfirmationPageStyles.js';

const LinkConfirmationPage = () => {

    const classes = makeStyles();
    const params = useParams();
    const token = params.token.replace(/['"]+/g, '');

    const[result, setResult] = useState("0");
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/user/authorizeUser", {
         method: "POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(token),
    }).then(res => res.json())
        .then((res) => {
            console.log(res);
            setResult(res);
            setLoading(false);


            if(res == 1 || res == -1){
            fetch("http://localhost:8080/user/updateEnabledUser", {
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                result: res,
                token: token,
            }),
    })}
        })

    }, [])



  return (

    !loading ?  

    result == 1 ? 

    <Container style = {{width: "60%"}}>
    <div className={classes.toolbar} />
                <div className={classes.root}>
                    <div className = {classes.toolbar} />
                        <Paper className={classes.paper}>
                        <Typography variant="h3" align="center">Success!</Typography>
                        <br />
                        <Typography variant="h4" align="center" style={{paddingBottom:"10px"}}>Your account has now been activated</Typography>
                        <br />
                        <Link to="/login-form" className={classes.links}><Typography variant="h5" align="center" style={{paddingBottom:"5px"}}>Click here to log in</Typography></Link>
                </Paper>
                </div>
    </Container>

:  result == -1 ?

<Container style = {{width: "60%"}}>
    <div className={classes.toolbar} />
                <div className={classes.root}>
                    <div className = {classes.toolbar} />
                        <Paper className={classes.paper}>
                        <Typography variant="h3" align="center">Error</Typography>
                        <br />
                        <Typography variant="h4" align="center" style={{paddingBottom:"10px"}}>This link has expired</Typography>
                        <br />
                        <Link to="/create-account-form" className={classes.links}><Typography variant="h5" align="center" style={{paddingBottom:"5px"}}>Click here to create an account</Typography></Link>
                </Paper>
                </div>
    </Container>

    : 

<Container style = {{width: "60%"}}>
    <div className={classes.toolbar} />
                <div className={classes.root}>
                    <div className = {classes.toolbar} />
                        <Paper className={classes.paper}>
                        <Typography variant="h3" align="center">Error</Typography>
                        <br />
                        <Typography variant="h4" align="center" style={{paddingBottom:"10px"}}>This link does not exist</Typography>
                        <br />
                        <Link to="/create-account-form" className={classes.links}><Typography variant="h5" align="center" style={{paddingBottom:"5px"}}>Click here to create an account</Typography></Link>
                </Paper>
                </div>
    </Container>

    : <></>
  )
}

export default LinkConfirmationPage