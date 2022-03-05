import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '100%',
    border: "1px solid #3254AA",
    boxShadow: "1px 2px 2px #3254AA" ,
    '&:hover': {
      boxShadow: "4px 5px 2px #3254AA",
  },
},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "0",
    paddingTop: "0px",
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  
}));