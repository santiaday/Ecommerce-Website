import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Divider } from '@material-ui/core';
import React, { useState , useEffect} from 'react';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import Product from '../Products/Product/Product.jsx';
import { commerce } from '../../lib/commerce';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Carousel from "react-elastic-carousel";
import './carouselStyles.css'

const Homepage = ({ onAddToCart}) => {

  const breakPoints = [
    { width: 1, itemsToShow: 1, slidesToSlide: 1},
    { width: 550, itemsToShow: 2, slidesToSlide: 2},
    { width: 768, itemsToShow: 3, slidesToSlide: 3},
    { width: 1200, itemsToShow: 4, slidesToSlide: 4},
  ];

const [newProducts, setNewProducts] = useState([]);
const [hotProducts, setHotProducts] = useState([]);

const fetchNewProducts = async () => {
  const { data } = await commerce.products.list({
    limit: 12,
    sortBy: "created",
    sortDirection: "desc",
  });

  setNewProducts(data);
};


const fetchHotProducts = async () => {
  const { data } = await commerce.products.list({
    limit: 12,
    sortBy: "created",
    sortDirection: "desc",
    category_slug: ['HotSeller']
  });

  setHotProducts(data);
};

const classes = useStyles();

useEffect(() => {

  fetchNewProducts();
  fetchHotProducts();

}, []);

  return (
      <Container fullWidth>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h2"><span style={{color: "#3254AA"}}>Welcome To</span> <span style={{color: "#71CE7E"}}>Excellent Store Inc.</span></Typography>
        <Typography className={classes.title} variant="h4" gutterBottom style={{marginTop: '10px'}}><span style={{color: "#3254AA"}}>Toy Collecting, </span> <span style={{color: "#71CE7E"}}>Simplified.</span></Typography>
        <br />
        

        <Grid container spacing={2}>
            <Grid xs={12} sm={6} lg={6}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <Card className={classes.root}>
                <CardMedia className={classes.media} image="thanosPic.jpg"/>
                  <Divider className={classes.divider}/>
                  <CardContent style={{paddingBottom: 0}}>

                  <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom align="center" className={classes.homepageLabels}>
                    <span style={{color: "#3254AA"}}>Browse Our </span> <span style={{color: "#71CE7E"}}>Popular Products</span>
                    </Typography>
                  </div>
                </CardContent>
            </Card>
            </Link>
          </Grid>

          <Grid xs={12} sm={6} lg={6}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <Card className={classes.root}>
                <CardMedia className={classes.media} image="thanosPic.jpg"/>
                  <Divider className={classes.divider}/>
                  <CardContent style={{paddingBottom: 0}}>

                  <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom align="center" className={classes.homepageLabels}>
                    <span style={{color: "#3254AA"}}>Browse Our</span> <span style={{color: "#71CE7E"}}>Complete Collection</span>
                    </Typography>
                  </div>
                </CardContent>
            </Card>
            </Link>
          </Grid>
        </Grid>

        <Divider className={classes.divider} style={{paddingTop: "30px", backgroundColor: "white"}}/>

        <Typography className={classes.title} variant="h3" gutterBottom style={{marginTop: "30px"}}><span style={{color: "#71CE7E"}}>Featured</span> <span style={{color: "#3254AA"}}>New Arrivals</span></Typography>

        <Carousel breakPoints={breakPoints} itemsToScroll="3" pagination={false} >
        {newProducts.map((product) => (
                <Grid item key = {product.id} xs={12} sm={6} md={4} lg={3} style={{minWidth: "95%"}}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
                ))}
        </Carousel>
          
        <Divider className={classes.divider} style={{paddingTop: "30px", backgroundColor: "white"}}/>
          
        <Typography className={classes.title} variant="h3" gutterBottom style={{marginTop: "30px"}}><span style={{color: "#71CE7E"}}>Featured</span> <span style={{color: "#3254AA"}}>Hot Sellers</span></Typography>
        <Carousel breakPoints={breakPoints} itemsToScroll="3" pagination={false} >
        {hotProducts.map((product) => (
                <Grid item key = {product.id} xs={12} sm={6} md={4} lg={3} style={{minWidth: "95%"}}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
                ))}
        </Carousel>
    </Container>

    
  )
}

export default Homepage