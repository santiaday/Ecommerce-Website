import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
    
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
<App /></ThemeProvider>, document.getElementById('root')
)