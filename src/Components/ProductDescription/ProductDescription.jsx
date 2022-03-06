import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Divider } from '@material-ui/core';
import { useLocation, useParams } from 'react-router-dom';
import useStyles from './styles';
import { commerce } from '../../lib/commerce';


console.log("Made it here");

const ProductDescription = () => {
  const temp = useParams();
  const productId = temp.productId;

const [product, setProduct] = useState([]);

const fetchProduct = async () => {
  const product = await commerce.products.retrieve(productId);

  setProduct(product);
};

useEffect(() => {

  fetchProduct();

}, []);

console.log(product.name);

  
  const classes = useStyles();


  return (
    <Container fullWidth>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h2"><span style={{color: "#3254AA"}}>Welcome To</span> <span style={{color: "#71CE7E"}}>Excellent Store Inc.</span></Typography>
        <Typography className={classes.title} variant="h4" gutterBottom style={{marginTop: '10px'}}>{product.name}</Typography>
        <br />
    </Container>
  )
}

export default ProductDescription