import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from '@blueprintjs/core';

import { PullRequest } from './api';
import * as actions from './actions';
import { Dispatch, State as ReducerState } from './reducer';

interface StateProps {
  loading: boolean;
  pullRequests: { [k: string]: PullRequest[] };
  config: { [k: string]: string | undefined };
}
interface DispatchProps {}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class PullRequests extends React.Component<Props, State> {
  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const repos = Object.keys(this.props.config).reduce((result, repo) => {
      if (this.props.config[repo] !== undefined) {
        result.push(repo);
      }
      return result;
    },                                                  [] as string[]);

    return (
      <div style={{ display: 'flex' }}>
        {repos.map(repo => {
          const authors = (this.props.config[repo] || '')
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);
          const pullRequests = this.props.pullRequests[repo].filter(pr => {
            if (authors.length === 0) {
              return true;
            }

            return authors.indexOf(pr.author) >= 0;
          });

          const greenkeeper = 'greenkeeper[bot]';
          function defaultCompare(a: string, b: string): number {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          }

          pullRequests.sort((p1, p2) => {
            if (p1.author !== greenkeeper && p2.author !== greenkeeper) {
              return defaultCompare(p1.title, p2.title);
            }
            if (p1.author === greenkeeper && p2.author === greenkeeper) {
              return defaultCompare(p1.title, p2.title);
            }
            if (p1.author === greenkeeper) {
              return 1;
            }
            if (p2.author === greenkeeper) {
              return -1;
            }
            return 0;
          });

          return (
            <div
              key={repo}
              className="pt-card pull-requests"
              style={{ width: `${100 / repos.length}%` }}
            >
              <h2 className="repo">
                {repo}
              </h2>
              <ul className="list">
                {pullRequests.map(pr => {
                  return (
                    <li key={pr.title} className="pull-request">
                      <img src={pr.avatar} className="image" />
                      <span className="title">
                        {pr.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state: ReducerState): StateProps {
  return {
    pullRequests: state.pullRequests,
    loading: state.loadingPullRequests,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators(
    {
      enableRepository: actions.enableRepository,
      disableRepository: actions.disableRepository,
      setRepositoryFilter: actions.setRepositoryFilter,
    },
    dispatch
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PullRequests);
