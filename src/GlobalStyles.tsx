import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: "Roboto";
    src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');
    font-weight: normal;
    font-style: normal;
}

body, html {
    font-family: 'Roboto', sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}
`;

export default GlobalStyles;
