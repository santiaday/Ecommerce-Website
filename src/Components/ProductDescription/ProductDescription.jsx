import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Divider } from '@material-ui/core';
import { useLocation, useParams, Link } from 'react-router-dom';
import useStyles from './styles';
import { commerce } from '../../lib/commerce';
import ImageGallery from 'react-image-gallery';



console.log("Made it here");

let ProductDescription = () => {
  let temp = useParams();
  let productId = temp.productId;

let [product, setProduct] = useState([]);
let [productImages, setProductImages] = useState([]);
let [productFeaturedImage, setProductFeaturedImage] = useState([]);
let [productCategory, setProductCategory] = useState([]);


let fetchProduct = async () => {
  let product = await commerce.products.retrieve(productId);

  setProduct(product);
  setProductFeaturedImage(product.assets[0].url);
  setProductImages(product.assets);
  setProductCategory(product.categories[0].name);
};



useEffect(() => {

  fetchProduct();

}, []);

console.log(product);
console.log(productFeaturedImage);
console.log(productImages);
console.log(productCategory);

  
  const classes = useStyles();


  return (
    <Container>
    

    <div className={classes.toolbar} style={{marginTop:"100px"}}/>
    <Typography gutterBottom variant='h6' style={{transform: "translateX(-7px)"}}>Home {'>'} Products {'>'} {productCategory} {'>'} {product.name}</Typography>
      <Grid container spacing={2} style={{marginTop: "10px"}}>
      <Grid xs={12} sm={6} lg={6}>
          <Card className={classes.root} style={{padding:"0px"}}>
            <CardMedia className={classes.media} image={productFeaturedImage} title={product.name}/>
          </Card>
          <Grid container spacing={4} direction={'row'} >
          {productImages.map((image) => (
                <Grid item key = {image.url} >
                 <CardMedia className={classes.thumbnail} image={image.url} style={{border: "1px solid #3254AA", cursor:"pointer"}} 
                 onClick={() => {setProductFeaturedImage(image.url)}} 
                 />
                </Grid>
                ))}
                </Grid>
      </Grid>
      <Grid xs={12} sm={6} lg={6}>
      <Typography gutterBottom variant='h3'>{product.name}</Typography>
      <Typography gutterBottom variant='h5'>{product.name}</Typography>
      </Grid>
</Grid>
</Container>
  )
}

export default ProductDescription