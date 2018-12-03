import {
  ContentBox,
  Headline,
  Icon,
  LoadingDots,
  Table,
  TableBody,
  TableColumn,
  TableColumnAction,
  TableRow
} from '@jimdo/ui';
import * as icons from '@jimdo/ui/icon/icons';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';

import { GithubRepository } from 'src/domain/GithubRepository';
import {
  FETCH_PULL_REQUESTS,
  FetchPullRequestsResponse
} from 'src/graphql/queries';

interface Props {
  repository: GithubRepository;
}

export class PullRequestsList extends React.Component<Props> {
  public render() {
    return (
      <Query
        query={FETCH_PULL_REQUESTS}
        variables={{
          name: this.props.repository.name,
          owner: this.props.repository.owner
        }}
        pollInterval={60 * 1000}
      >
        {({ loading, error, data }: QueryResult<FetchPullRequestsResponse>) => {
          if (loading) {
            return (
              <ContentBox className="pull-requests-list">
                <Headline noGutter={true} type="small">
                  {`${this.props.repository.owner}/${
                    this.props.repository.name
                  }`}
                </Headline>
                <LoadingDots />
              </ContentBox>
            );
          }

          if (error) {
            return (
              <ContentBox className="pull-requests-list">
                <Headline noGutter={true} type="small">
                  {`${this.props.repository.owner}/${
                    this.props.repository.name
                  }`}
                </Headline>
                <div>Error: {JSON.stringify(error)}</div>
              </ContentBox>
            );
          }

          if (!data) {
            return (
              <ContentBox className="pull-requests-list">
                <Headline noGutter={true} type="small">
                  {`${this.props.repository.owner}/${
                    this.props.repository.name
                  }`}
                </Headline>
                <div>Error: could not load data</div>
              </ContentBox>
            );
          }

          if (data.repository.pullRequests.nodes.length === 0) {
            return null;
          }

          return (
            <ContentBox className="pull-requests-list">
              <Headline noGutter={true} type="small">
                {`${this.props.repository.owner}/${this.props.repository.name}`}
              </Headline>
              <Table className="pull-requests-table">
                <TableBody>
                  {data.repository.pullRequests.nodes.map(pr => {
                    const buildSucceeded =
                      (pr.commits.nodes.length !== 0 &&
                        !pr.commits.nodes[0].commit.status) ||
                      (pr.commits.nodes[0].commit.status &&
                        pr.commits.nodes[0].commit.status.contexts.every(
                          c => c.state === 'SUCCESS'
                        ));
                    const mergeable =
                      pr.mergeable !== 'CONFLICTING' && buildSucceeded;
                    return (
                      <TableRow key={pr.number}>
                        <TableColumnAction>
                          <img
                            className="author-image"
                            src={pr.author.avatarUrl}
                          />
                        </TableColumnAction>
                        <TableColumn mobileLabel="title" className="pull-request-title">
                          {pr.title}
                        </TableColumn>
                        <TableColumnAction>
                          {mergeable ? (
                            <Icon
                              className="icon-success"
                              icon={icons.checkmark}
                            />
                          ) : (
                            <Icon className="icon-fail" icon={icons.close} />
                          )}
                        </TableColumnAction>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </ContentBox>
          );
        }}
      </Query>
    );
  }
}
