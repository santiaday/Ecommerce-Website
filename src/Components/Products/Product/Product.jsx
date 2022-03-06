import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button} from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import useStyles from './styles';
import './productStyles.css'

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles(); 

  return(
<Link to={`/product/${product.id}`} params={{productId: product.id}} style={{textDecoration:'none'}}>
   <Card className={classes.root}>
           <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
           <CardContent style={{height: "120px", paddingBottom: "0px"}}>
               <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
               </div>
               <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary"></Typography>
           </CardContent>
           <CardActions disableSpacing className ={classes.cardActions} style={{justifyContent: 'space-between'}}>
           <Typography variant="h5" align="left">
                        {product.price.formatted_with_symbol}
                    </Typography>
                <IconButton className={"CustomButton"} alignItems="center">
                    <Button onClick={() => onAddToCart(product.id, 1)} size="medium" type="button" variant="contained" color="primary" style={{paddingRight:"7px", paddingLeft:"7px"}}>Add To Cart<AddShoppingCart style={{paddingLeft:"4px",fontSize:"20px"}}/></Button>
                </IconButton>
           </CardActions>
  </Card>
  </Link>
  )
};

export default Product;
