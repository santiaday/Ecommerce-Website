import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {commerce} from '../../lib/commerce';

import FormInput from './FormInput';

const BillingForm = (checkoutToken, next) => {
    

    const methods = useForm();
    const [billingCountries, setBillingCountries] = useState([]);
    const [billingCountry, setBillingCountry] = useState('');
    const [billingSubdivisions, setBillingSubdivisions] = useState([]);
    const [billingSubdivision, setBillingSubdivision] = useState('');

    const countries = Object.entries(billingCountries).map(([code, name]) => ({ id: code, label: name }));
    const subdivisions = Object.entries(billingSubdivisions).map(([code, name]) => ({ id: code, label: name }));

    const fetchBillingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries);

        setBillingCountries(countries);
        setBillingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode)=> {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

        setBillingSubdivisions(subdivisions);
        setBillingSubdivision(Object.keys(subdivisions)[0]);
    }

    useEffect(() => {
        fetchBillingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if(billingCountry){
         fetchSubdivisions(billingCountry);
         console.log(fetchSubdivisions(billingCountry));
        }
    }, [billingCountry]);


    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, billingCountry, billingSubdivision}))} >
                    <Grid container spacing={3}>
                        <FormInput required name="billingName" label="Name on Card"/>
                        <FormInput required name="billingStreet" label="Billing Address"/>
                        <FormInput required name="billingTown_city" label="City"/>
                        <FormInput required name="billingPostal_zip_code" label="ZIP / Postal Code"/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Billing Country</InputLabel>
                            <Select value={billingCountry} fullWidth onChange={(e) => setBillingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Billing Subdivision</InputLabel>
                            <Select value={billingSubdivision} fullWidth onChange={(e) => setBillingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <CardElement />
                    <br />
                    
                </form>
            </FormProvider>
        </>
      );
}

export default BillingForm