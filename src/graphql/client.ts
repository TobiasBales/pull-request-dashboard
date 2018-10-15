import ApolloClient from 'apollo-boost';

export function createClient(accessToken: string) {
  return new ApolloClient({
    headers: { Authorization: `Bearer ${accessToken}` },
    uri: 'https://api.github.com/graphql'
  });
}
