import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const client = new ApolloClient({
  credentials : "include",
  headers : {
      "API-ID": "lfdjpwzwbjhr3psfq5w7wyakui",
      "API KEY": "dda2-bila5xsilzegjgtqsfncolxeve"
  },
  uri: 'https://6ytdelytwbdfbbyojwmxqit6ou.appsync-api.us-east-1.amazonaws.com/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
