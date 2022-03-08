import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`

* { 
  font-family: 'League Spartan', sans-serif !important;
}

body {
  overflow-y: visible;
  scroll-behavior: auto;
}

html {
  overflow:   auto;
  overflow-x: auto;

  
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
`;
 
export default GlobalStyle;