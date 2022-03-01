import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
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
  outlinedPrimary: {
    color: theme.palette.primary.main,
    border: "2px solid",
    '&:hover': {
      border: "2px solid #3254AA",
      backgroundColor: theme.palette.primary.main,
      color: '#FFFFFF'
    }
  },
  outlinedSecondary: {
    color: "#FFFFFF",
    '&:hover': {
      border: "2px solid {theme.palette.secondary.main}",
      backgroundColor: theme.palette.secondary.main,
      color: '#FFFFFF'
    }
  },
}));