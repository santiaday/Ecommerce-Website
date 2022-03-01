import { Container, Typography, Button, Grid, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import React from 'react'
import useStyles from './styles';


const Homepage = () => {

const classes = useStyles();

  return (
      <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} noWrap variant="h2" gutterBottom><span style={{color: "#71CE7E"}}>Welcome To</span> <span style={{color: "#3254AA"}}>Excellent Store Inc.</span></Typography>
        <br />
        

        <Grid container spacing={4}>
            <Grid xs={12} sm={6} lg={6}>
            <Card className={classes.root}>
           <CardMedia className={classes.media} image="thanosPic.jpg" />
           <CardContent>
               <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
    
                    </Typography>
                    <Typography variant="h5">
                        
                    </Typography>
               </div>
               <Typography variant="body2" color="textSecondary"></Typography>
           </CardContent>
           <CardActions disableSpacing className ={classes.cardActions}>
           </CardActions>
  </Card>
            </Grid>
            <Grid xs={12} sm={6} lg={6}>
            <Card className={classes.root}>
           <CardMedia className={classes.media} image="thanosPic.jpg" />
           <CardContent>
               <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
    
                    </Typography>
                    <Typography variant="h5">
                        
                    </Typography>
               </div>
               <Typography variant="body2" color="textSecondary"></Typography>
           </CardContent>
           <CardActions disableSpacing className ={classes.cardActions}>
           </CardActions>
  </Card>
            </Grid>
        </Grid>
    </Container>
  )
}

export default Homepage