import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

const client = new ApolloClient({
    headers : {
        "API-ID": "e5fiatrazzfp5nzvtthoff6gfq",
        "API KEY": "da2-dxhgvlyc6fgpbpplwelihkd5x4",
    },
    uri: 'https://qciohjhxuvgchjsvrpghrcdsqy.appsync-api.eu-west-1.amazonaws.com/graphql',
    cache: new InMemoryCache()
});


export default client