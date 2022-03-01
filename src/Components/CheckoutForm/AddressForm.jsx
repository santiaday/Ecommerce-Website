import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider} from 'react-hook-form';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

import {commerce} from '../../lib/commerce';

import FormInput from './FormInput';
import makeStyles from './addressFormStyles';

const AddressForm = ({ checkoutToken, next }) => {
    const classes = makeStyles();
    const methods = useForm();


    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries);

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode)=> {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country , region} );

        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if(shippingCountry){
         fetchSubdivisions(shippingCountry);
         console.log(fetchSubdivisions(shippingCountry));
        }
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id , shippingCountry, shippingSubdivision);
    }, [shippingSubdivision])

  return (
    <>
        <Typography variant = "h6" gutterBottom>Shipping Information</Typography>
        <br />
        <FormProvider {...methods}>
            <form novalidate onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption}))} >
                <Grid container spacing={3}>
                    <FormInput required name="firstName" label="First Name" />
                    <FormInput required name="lastName" label="Last Name"/>
                    <FormInput required name="email" label="Email"/>
                    <FormInput required name="address1" label="Address"/>
                    <FormInput required name="city" label="City"/>
                    <FormInput required name="ZIP" label="ZIP / Postal Code"/>
                <Grid item xs={12} sm={6}>
                        <TextField style={{ width: "100%" }} variant="outlined" value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} select label="Country" >
                            {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                            {country.label}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField style={{ width: "100%" }} variant="outlined" value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)}  select label="State" >
                            {subdivisions.map((subdivision) => (
                            <MenuItem key={subdivision.id} value={subdivision.id}>
                            {subdivision.label}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField style={{ width: "100%" }} variant="outlined" value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}  select label="Option" >
                            {options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                            {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Button className={classes.emptyButton} component = { Link } to='/cart' size="large" type="button" variant="contained" color="primary">Back to Cart</Button>
                        <Button type="submit" variant="contained" className={classes.checkoutButton} size="large" color="secondary">Next</Button>
                        
                </div>
            </form>
        </FormProvider>
    </>
  );
}

export default AddressForm