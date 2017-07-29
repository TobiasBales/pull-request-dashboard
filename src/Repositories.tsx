import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox, Spinner } from '@blueprintjs/core';

import { Repository } from './api';
import * as actions from './actions';
import { Dispatch, State as ReducerState } from './reducer';

interface StateProps {
  repositories: Repository[];
  loading: boolean;
  config: { [k: string]: string | undefined };
}
interface DispatchProps {
  enableRepository(repo: string): void;
  disableRepository(repo: string): void;
  setRepositoryFilter(repo: string, filter: string): void;
}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class Repositories extends React.Component<Props, State> {
  toggleRepository = (repo: string) => (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    if (e.currentTarget.checked) {
      this.props.enableRepository(repo);
    } else {
      this.props.disableRepository(repo);
    }
  };

  setRepositoryFilter = (repo: string) => (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    this.props.setRepositoryFilter(repo, e.currentTarget.value);
  };

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <div className="center">
        <table className="pt-table pt-condensed">
          <thead>
            <tr>
              <th>Show</th>
              <th>Repo</th>
              <th>Filter</th>
            </tr>
          </thead>
          <tbody>
            {this.props.repositories.map(repo => {
              return (
                <tr key={repo}>
                  <td>
                    <Checkbox
                      checked={this.props.config[repo] !== undefined}
                      onChange={this.toggleRepository(repo)}
                    />
                  </td>
                  <td>
                    {repo}
                  </td>
                  <td>
                    <input
                      type="text"
                      className="pt-input"
                      disabled={this.props.config[repo] === undefined}
                      value={this.props.config[repo] || ''}
                      onChange={this.setRepositoryFilter(repo)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state: ReducerState): StateProps {
  return {
    repositories: state.repositories,
    loading: state.loadingRepositories,
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
)(Repositories);
