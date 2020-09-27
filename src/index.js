import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createGlobalStyle, ThemeProvider } from 'styled-components';

import App from './pages/App';

import store from './store';

import theme from './styles/theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: Poppins;
    h1, h2, h3, h4, h5, h6 {
      color: ${(props) => props.theme.heading};
      margin-top: 0px;
      margin-bottom: 16px;
    }
    img {
      width: 100%;
      max-width: 100%;
    }
  },
`;

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
