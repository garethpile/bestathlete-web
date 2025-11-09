import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { getTraceHeaders } from "../services/traceHelpers";

const httpLink = createHttpLink({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    return {
      headers: {
        ...headers,
        Authorization: token,
        ...getTraceHeaders(),
      },
    };
  } catch (error) {
    console.warn("Unable to obtain Cognito session for GraphQL auth", error);
    return {
      headers: {
        ...headers,
        ...getTraceHeaders(),
      },
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
