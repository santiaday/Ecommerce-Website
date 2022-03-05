import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles(); 

  return(
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
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart style={{fontSize: "30px", color: "black"}}/>
                </IconButton>
           </CardActions>
  </Card>
  )
};

export default Product;
