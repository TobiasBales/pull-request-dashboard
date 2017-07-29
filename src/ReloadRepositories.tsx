import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';

import * as actions from './actions';
import { Dispatch, State as ReducerState } from './reducer';

interface StateProps {}
interface DispatchProps {
  fetchRepositories(): void;
}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class ReloadRepositories extends React.Component<Props, State> {
  render() {
    return (
      <div style={{ textAlign: 'right' }}>
        <Button onClick={this.props.fetchRepositories} text="refresh repos" />
      </div>
    );
  }
}

function mapStateToProps(state: ReducerState): StateProps {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators(
    { fetchRepositories: actions.fetchRepositories },
    dispatch
  );
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ReloadRepositories);
