import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
