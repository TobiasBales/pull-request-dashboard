import gql from 'graphql-tag';

export const FETCH_PULL_REQUESTS = gql`
  query pullRequests($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      nameWithOwner
      pullRequests(first: 50, states: OPEN) {
        nodes {
          additions
          author {
            avatarUrl
            login
          }
          baseRef {
            name
          }
          commits(last: 1) {
            nodes {
              commit {
                status {
                  contexts {
                    context
                    state
                  }
                }
              }
            }
          }
          labels(first: 100) {
            nodes {
              name
            }
          }
          mergeable
          number
          updatedAt
          title
        }
      }
    }
  }
`;

export interface FetchPullRequestsResponse {
  repository: {
    nameWithOwner: string;
    pullRequests: {
      nodes: Array<{
        additions: number;
        author: {
          avatarUrl: string;
          login: string;
        };
        baseRef: {
          name: string;
        };
        commits: {
          nodes: Array<{
            commit: {
              status: {
                contexts: Array<{
                  context: string;
                  state:
                    | 'EXPECTED'
                    | 'ERROR'
                    | 'FAILURE'
                    | 'PENDING'
                    | 'SUCCESS';
                }>;
              };
            };
          }>;
        };
        labels: Array<{
          nodes: { name: string };
        }>;
        mergeable: 'MERGABLE' | 'CONFLICTING' | 'UNKNOWN';
        number: number;
        updatedAt: string;
        title: string;
      }>;
    };
  };
}
