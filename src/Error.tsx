import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Dispatch, State as ReducerState } from './reducer';

interface StateProps {
  error?: string;
}
interface DispatchProps {}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class Repositories extends React.Component<Props, State> {
  render() {
    if (!this.props.error) {
      return null;
    }

    return (
      <div>
        {this.props.error}
      </div>
    );
  }
}

function mapStateToProps(state: ReducerState): StateProps {
  return {
    error: state.error,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators({}, dispatch);
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Repositories);
