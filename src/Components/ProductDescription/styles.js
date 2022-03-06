import { makeStyles } from '@material-ui/core/styles';
import { Translate } from '@material-ui/icons';
import { keyframes } from 'styled-components';


export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    // maxWidth: 345, original width style
    maxWidth: '92%',
    border: "1px solid #3254AA",
    padding: "10px 10px 10px 10px",
    boxShadow: "6px 10px 3px 2px #3254AA",
    marginBottom: "20px",
    '&:hover': {
      boxShadow: "10px 14px 3px 2px #3254AA",
    },
  },
  title: {
    marginTop: '50px',
    textAlign:"center",
    width:"100%",
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
    color: 'white',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
  },
  media: {
    height: 600,
  },
  typo: {
    alignItems: 'center', 
     justifyContent:'center',
  },
  cardContent: {
    textAlign: 'center',
    flexGrow: 1,
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  homepageLabels: {
    fontSize: "36px",
  },
  divider: {
    color: "#3254AA",
    borderBottom: "2px solid"
  },
  dividerText: {
    color: "#3254AA",
    borderBottom: "2px solid",
    paddingBottom: "50px",
    border: "1px solid b"
  },
  dividerText: {
    color: "#3254AA",
    borderBottom: "2px solid",
    paddingBottom: "50px",
    border: "1px solid b"
  },
}));