import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from 'material-ui';

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
      return <CircularProgress mode="indeterminate" />;
    }

    const repos = Object.keys(this.props.config).reduce((result, repo) => {
      if (this.props.config[repo] !== undefined) {
        result.push(repo);
      }
      return result;
    }, [] as string[]);

    return (
      <div style={{ display: 'flex' }}>
        {repos.map(repo => {
          const authors = (this.props.config[repo] || '')
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);
          const greenkeeper = 'greenkeeper[bot]';
          const pullRequests = this.props.pullRequests[repo].filter(pr => {
            if (pr.author === greenkeeper) {
              return false;
            }

            if (authors.length === 0) {
              return true;
            }

            return authors.indexOf(pr.author) >= 0;
          });

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
            return defaultCompare(p1.author, p2.author);
          });

          return (
            <div key={repo} style={{ width: `${100 / repos.length}%` }}>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <h2>
                        {repo}
                      </h2>
                    }
                  />
                </ListItem>
                {pullRequests.map(pr => {
                  return (
                    <ListItem key={pr.title}>
                      <ListItemAvatar>
                        <Avatar src={pr.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={pr.title} />
                    </ListItem>
                  );
                })}
              </List>
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
