import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`

* { 
  font-family: 'Righteous', cursive !important;
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