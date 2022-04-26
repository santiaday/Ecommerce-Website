import React , { useState } from 'react'
import {useParams} from 'react-router-dom';
import Product from '../../../Products/Product/Product'
import {Grid} from '@material-ui/core'
import useStyles from './searchResultsStyles.js'

const SearchResults = ({products, onAddToCart}) => {

const classes = useStyles();

const[filteredProducts, setFilteredProducts] = useState([]);

const temp = useParams();
const keyword = temp.keyword;
console.log(keyword);

const newFilter = products.filter((value) => {
  return value.name.toString().toLowerCase().replace(/ /g,'').includes(keyword);
  });

  return (
    <>
    <main className={classes.content}>
        <br />    
        <div className={classes.toolbar}/>

        <Grid container justify = 'center' spacing = {4}>

            {newFilter.map((product) => (
                <Grid item key = {product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
            ))}

        </Grid>

    </main>
    </>
  )
}

export default SearchResults