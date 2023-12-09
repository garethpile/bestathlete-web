import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

const client = new ApolloClient({
    headers : {
        "API-ID": "6adx34ssp5adzfwlkyksh5woum",
        "API KEY": "da2-4xo5fy5qyfdkjmggbzhw2bu6qe",
    },
    uri: 'https://dhy5zxj44zbzfdh6pc72ou7gty.appsync-api.eu-west-1.amazonaws.com/graphql',
    cache: new InMemoryCache()
});


export default client