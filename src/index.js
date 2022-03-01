import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';  

const theme = createTheme({
    palette: {
       primary: {
          main: '#3254AA',
       },
       secondary: {
         main: '#71CE7E',
       },
      cart: {
        main: '#FFFFFF',
      },
    },
    typography: { 
       useNextVariants: true
    }
 });

ReactDOM.render(
    <ThemeProvider theme={theme}>
<App /></ThemeProvider>, document.getElementById('root')
)