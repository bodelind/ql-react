import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: "Roboto";
    font-weight: normal;
    font-style: normal;
}

body, html {
    font-family: 'Roboto', sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: #121527;
}
`;

export default GlobalStyles;
