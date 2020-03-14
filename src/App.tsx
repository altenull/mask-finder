import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { fontWeights } from './app/src/ui/inline-styles';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,500');

  html, body {
    margin: 0;
    font-family: 'Roboto', Arial, sans-serif;
    font-weight: ${fontWeights.ultraLight};
    font-size: 16px;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    user-select: none;
  }

  #root {
    height: 100%;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
    </>
  );
};

export default App;
