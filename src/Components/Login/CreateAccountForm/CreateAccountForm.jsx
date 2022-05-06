import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper, CssBaseline, Container} from '@material-ui/core';
import { useForm, FormProvider} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';


import makeStyles from './createAccountFormStyles';




const CreateAccountForm = () => {

    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const classes = makeStyles();
    const methods = useForm();
    const navigate = useNavigate()

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[passwordConfirm, setPasswordConfirm] = useState("");
    const[passwordsMatch, setPasswordsMatch] = useState("0");
    const[fieldsFilled, setFieldsFilled] = useState("0");
    const[validEmail, setValidEmail] = useState("0");
    const[validName, setValidName] = useState("0");
    const[nameLength, setNameLength] = useState("0");
    const[usernameLength, setUsernameLength] = useState("0");
    const[emailLength, setEmailLength] = useState("0");
    const[passwordLength, setPasswordLength] = useState("0");
    const[authLevel, setAuthLevel] = useState("User");
    const[emailExists,setEmailExists] = useState("");
    const[usernameExists, setUsernameExists] = useState("User");
    const[userEnabled, setUserEnabled] = useState("0");

     const handleClick = (e) => {
         e.preventDefault();

        setPasswordsMatch("0");
        setFieldsFilled("0");
        setValidEmail("0");
        setValidName("0");
        setNameLength("0");
        setEmailLength("0");
        setUsernameLength("0");
        setPasswordLength("0");
        setEmailExists("0");
        setUsernameExists("0");

        if(name === "" ||username === "" ||password === "" ||email === "" ||passwordConfirm === ""){
            setFieldsFilled(-1);
            return;
        }else{
            setFieldsFilled(1);
        } 

        if(password === passwordConfirm){
            setPasswordsMatch(1);
        }else{
            setPasswordsMatch(-1);
            return;
        }

        if(!(email.includes('@'))){
            setValidEmail(-1);
            return;
        }else{
            setValidEmail(1);
        }

        const tempName = name.split(" ");

        if(tempName.length <= 1){
            setValidName(-1);
            return;
        }else{
            setValidName(1);
        }

        if(name.length > 25){
            setNameLength(-1);
            return;
        }else{
            setNameLength(1);
        }

        if(email.length > 55){
            setEmailLength(-1);
            return;
        }else{
            setEmailLength(1);
        }

        if(username.length > 25){
            setUsernameLength(-1);
            return;
        }else{
            setUsernameLength(1);
        }

        if(password.length > 25){
            setPasswordLength(-1);
            return;
        }else{
            setPasswordLength(1);
        }

         const user = {username, password, email, name, authLevel, userEnabled};


         fetch("http://localhost:8080/user/checkCreateUser", {
         method: "POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(user),
     }).then(result => result.json())
        .then((result) => {
            if(result == 1){
                setUsernameExists(-1);
                setEmailExists(-1);

                fetch("http://localhost:8080/user/add", {
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
     })
             navigate('/confirmation-' + email, {state: {email: email}});
            }else if(result == 2){
                setEmailExists(1);
                return;
            }else if(result == 3){
                setUsernameExists(1);
                return;
            }
        })
       
     }

  return (
<>
<Container style = {{width: "60%"}}>
<div className={classes.toolbar} />
            <div className={classes.root}>
                <div className = {classes.toolbar} />
                    <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Create Account</Typography>
                    <br />
                    <form className={classes.root} noValidate style={{textAlign:"center"}} autocomplete="off">
                    <TextField label="Name" variant='standard' fullWidth required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        style={{paddingBottom: "25px", display:"inline-flex"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <TextField label="Email Address" variant='standard' fullWidth required
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        style={{paddingBottom: "25px", display:"inline-flex"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <TextField label="Username" variant='standard' fullWidth required
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        style={{paddingBottom: "25px", display:"inline-flex"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <TextField label="Password" variant='standard' fullWidth required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{paddingBottom: "25px", display:"inline-flex"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <TextField label="Confirm Password" variant='standard' fullWidth required
                        value={passwordConfirm}
                        onChange={(e)=>setPasswordConfirm(e.target.value)}
                        style={{paddingBottom: "25px", display:"inline-flex"}}
                        inputProps={{style: {fontSize: 25}}}
                        InputLabelProps={{style: {fontSize: 25}}}
                    />
                    <div style={{paddingBottom: "15px"}}>
                    <Button variant="contained" type='submit' color="primary" onClick={handleClick} style={{float: "right", transform: "translateY(6px)"}}>
                        Create Account
                    </Button>
                    {passwordsMatch == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Passwords Do Not Match</Typography> : <></>}
                    {fieldsFilled == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Please Fill Out All Fields</Typography> : <></>}
                    {validEmail == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Please Provide A Valid Email Address</Typography> : <></>}
                    {validName == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Please Provide First And Last Name</Typography> : <></>}
                    {nameLength == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Max Length Of Name Is 25 Characters</Typography> : <></>}
                    {emailLength == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Max Length Of Email Is 55 Characters</Typography> : <></>}
                    {usernameLength == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Max Length Of Username Is 25 Characters</Typography> : <></>}
                    {passwordLength == -1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Max Length Of Password Is 25 Characters</Typography> : <></>}
                    {emailExists == 1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Account With That Email Already Exists</Typography> : <></>}
                    {usernameExists == 1 ? <Typography variant="body2" align="left" style={{paddingTop: "20px", marginLeft: "0px"}}>Account With That Username Already Exists</Typography> : <></>}
                    </div>
                </form>
            </Paper>
            </div>
</Container>
</>
)
}

export default CreateAccountForm