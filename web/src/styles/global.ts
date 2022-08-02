import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  html {
    scroll-behavior: smooth;
    box-sizing: inherit;
    width: 100vw;
    height: auto;
    overflow-x: hidden;
    background: #121214;
    color: #fefefe;
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`;
