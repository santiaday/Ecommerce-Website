import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button} from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import './productStyles.css';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles(); 
//   let [productBrand, setProductBrand] = useState([]);
//   setProductBrand(product.attributes[0].value);
const { height, width } = useWindowDimensions();

const isSmallScreen = (width <= 400);

  return(
<Link to={`/product/${product.id}`} params={{productId: product.id}} style={{textDecoration:'none'}}>
   <Card className={classes.root}>
           <CardMedia  className={classes.media} image={product.image.url} title={product.name} style={{paddingTop: "200px"}}/>
           <CardContent style={{height: "70px", paddingBottom: "0px"}}>
               <div className={classes.cardContent}>
                    <Typography style={{fontSize:"15px"}} gutterBottom>
                        {product.name}
                    </Typography>
               </div>
               {/* <Typography variant="subtitle1" style={{ fontStyle: 'italic' }} gutterBottom>
                        {product.attributes[0].value}
                    </Typography> */}
               {/* <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary" noWrap style={{overflow:"hidden"}}></Typography> */}
           </CardContent>
           <CardActions disableSpacing className ={classes.cardActions} style={{justifyContent: 'space-between', paddingTop:"15px"}}>
           <Typography variant="h5" align="left">
                        {product.price.formatted_with_symbol}
                    </Typography>
                <IconButton className={"CustomButton"} alignItems="center">
                    {isSmallScreen ?
                      <Button onClick={() => onAddToCart(product.id, 1)} size="medium" type="button" variant="contained" color="primary" style={{paddingRight:"7px", paddingLeft:"7px"}}><AddShoppingCart style={{paddingLeft:"4px",fontSize:"20px"}}/></Button>
                      : <Button onClick={() => onAddToCart(product.id, 1)} size="medium" type="button" variant="contained" color="primary" style={{paddingRight:"7px", paddingLeft:"7px"}}>Add To Cart<AddShoppingCart style={{paddingLeft:"4px",fontSize:"20px"}}/></Button>}
                </IconButton>
           </CardActions>
  </Card>
  </Link>
  )
};

export default Product;
