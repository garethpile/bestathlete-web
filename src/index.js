import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@aws-amplify/ui-react/styles.css';
import 'antd/dist/antd.css'; // ✅ Ant Design global styles (v5)

import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import client from './Apollo';
import { getTraceHeaders } from './services/traceHelpers';

Amplify.configure({
  ...config,
  API: {
    ...(config.API || {}),
    graphql_headers: async () => getTraceHeaders(),
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
