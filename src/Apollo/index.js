import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";

const client = new ApolloClient({
    headers : {
        "API-ID": "lfdjpwzwbjhr3psfq5w7wyakui",
        "API KEY": "da2-bila5xsilzegjgtqsfncolxeve",
    },
    uri: 'https://qciohjhxuvgchjsvrpghrcdsqy.appsync-api.eu-west-1.amazonaws.com/graphql',
    cache: new InMemoryCache()
});


export default client