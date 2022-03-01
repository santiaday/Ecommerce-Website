import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`

* { 
  font-family: 'Righteous', cursive !important;
}

html {
  overflow:   scroll;
  overflow-x: auto;
  
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
`;
 
export default GlobalStyle;