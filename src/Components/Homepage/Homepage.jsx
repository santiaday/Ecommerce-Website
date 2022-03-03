import { Container, Typography, Button, Grid, Card, CardActions, CardContent, CardMedia, Divider } from '@material-ui/core';
import React from 'react'
import useStyles from './styles';
import { Link } from 'react-router-dom';


const Homepage = () => {

const classes = useStyles();

  return (
      <Container fullWidth>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h2" gutterBottom><span style={{color: "#71CE7E"}}>Welcome To</span> <span style={{color: "#3254AA"}}>Excellent Store Inc.</span></Typography>
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
                      Shop our Popular Products
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
                      Browse All Products
                    </Typography>
                  </div>
                </CardContent>
            </Card>
            </Link>
          </Grid>
        </Grid>

        <Typography className={classes.title} variant="h3" gutterBottom><span style={{color: "#71CE7E"}}>Featured</span> <span style={{color: "#3254AA"}}>New Arrivals</span></Typography>
        <Grid xs={6} sm={3}>
        {products.map((product) => (
                <Grid item key = {product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
            ))}
          </Grid>

    </Container>

    
  )
}

export default Homepage