import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Divider, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useParams, Link } from 'react-router-dom';
import useStyles from './styles';
import { commerce } from '../../lib/commerce';
import { AddShoppingCart } from '@material-ui/icons';
import './styles.css';
import Product from '../Products/Product/Product.jsx';
import Carousel from "react-elastic-carousel";
import './carouselStyles.css'

console.log("Made it here");

let ProductDescription = ({onAddToCart}) => {
  let temp = useParams();
  let productId = temp.productId;

  const classes = useStyles();

  const breakPoints = [
    { width: 1, itemsToShow: 1, slidesToSlide: 1},
    { width: 550, itemsToShow: 2, slidesToSlide: 2},
    { width: 768, itemsToShow: 4, slidesToSlide: 3},
    { width: 1200, itemsToShow: 4, slidesToSlide: 4},
  ];


let [product, setProduct] = useState([]);
let [productImages, setProductImages] = useState([]);
let [productFeaturedImage, setProductFeaturedImage] = useState([]);
let [productCategory, setProductCategory] = useState([]);
let [productBrand, setProductBrand] = useState([]);
let [productPrice, setProductPrice] = useState([]);
let [productInventory, setProductInventory] = useState([]);
let [productQuantity, setProductQuantity] = useState([]);
let [relatedProducts, setRelatedProducts] = useState([]);


let fetchProduct = async () => {
  let product = await commerce.products.retrieve(productId);

  setProduct(product);
  setProductFeaturedImage(product.assets[0].url);
  setProductImages(product.assets);
  setProductCategory(product.categories[0].name);
  setProductBrand(product.attributes[0].value);
  setProductPrice(product.price.formatted_with_symbol);
  setProductInventory(product.inventory.available);
  setRelatedProducts(product.related_products);
};




useEffect(() => {

  fetchProduct();

}, []);

console.log(product);
console.log(productFeaturedImage);
console.log(productImages);
console.log(productCategory);
console.log(productPrice);
console.log(productInventory);
console.log(relatedProducts);


  return (
    <Container>
    

    <div className={classes.toolbar} style={{marginTop:"75px"}}/>
    <Typography gutterBottom variant='h6' style={{transform: "translateX(-7px)"}}>Home {'>'} Products {'>'} {productCategory} {'>'} {product.name}</Typography>
      <Grid container spacing={2} style={{marginTop: "15px"}}>
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
      <Typography gutterBottom variant='h4' style={{fontWeight: "bold"}}>{product.name}</Typography>
      <Typography gutterBottom variant='h6'>By: {productBrand}</Typography>
      <Typography gutterBottom variant='h5'>{productPrice}</Typography>

      <Typography gutterBottom variant='h5' style={{paddingTop:"15px"}}>

      <FormControl variant="outlined" style={{width: "120px" , transform: "translateY(-11px)" , paddingRight: "20px", paddingTop: "10px"}}>
      <InputLabel style={{paddingTop: "12px"}}>Quantity</InputLabel>
      <Select value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} MenuProps={{ anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: () => null,
          }}>
        {[...Array(productInventory)].map((e, i) => {
        return <MenuItem value={i+1} key={i}>{i+1}</MenuItem>
        })}
    
      </Select>
</FormControl>
<FormControl>
<Button onClick={() => onAddToCart(product.id, productQuantity)} size="large" type="button" variant="contained" color="primary" style={{paddingRight:"7px", paddingLeft:"7px", width: "250px", height:"56px"}}>
      <span style={{paddingTop: "5px", paddingRight: "5px", fontSize:"20px"}}>Add To Cart</span>
      <AddShoppingCart style={{paddingLeft:"4px",fontSize:"20px"}}/>
      </Button>
      </FormControl>
      </Typography>

      <Typography gutterBottom variant='body1' style={{fontSize: "17px", fontWeight: "lighter"}} dangerouslySetInnerHTML={{ __html: product.description}}></Typography>
      
      </Grid>
</Grid>
<Divider className={classes.divider} style={{paddingTop: "30px", backgroundColor: "white"}}/>
<Typography className={classes.title} variant="h3" gutterBottom style={{marginTop: "30px"}}><span style={{color: "#3254AA"}}>You May Also Like</span></Typography>
<Carousel breakPoints={breakPoints} itemsToScroll="3" pagination={false} >
        {relatedProducts.map((product) => (
                <Grid item key = {product.id} xs={12} sm={6} md={4} lg={3} style={{minWidth: "95%"}}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
                ))}
        </Carousel>
</Container>
  )
}



export default ProductDescription