import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@aws-amplify/ui-react/styles.css';
import 'antd/dist/antd.css'; // ✅ Ant Design global styles (v5)

import { Amplify } from 'aws-amplify';
import { AwsRum } from 'aws-rum-web';
import config from './aws-exports';
import client from './Apollo';
import { getTraceHeaders } from './services/traceHelpers';

if (typeof window !== 'undefined') {
  try {
    const rumConfig = {
      sessionSampleRate: 0.1,
      endpoint: 'https://dataplane.rum.us-east-1.amazonaws.com',
      telemetries: ['performance', 'errors', 'http'],
      allowCookies: true,
      enableXRay: false,
      signing: true, // Set to false if sending unsigned requests via a public resource policy
    };

    const APPLICATION_ID = '0a206a6b-bb02-47aa-b0cd-a2a53d0b7a21';
    const APPLICATION_VERSION = '1.0.0';
    const APPLICATION_REGION = 'us-east-1';

    new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, rumConfig);
  } catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
  }
}

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
