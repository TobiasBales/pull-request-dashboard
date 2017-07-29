import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Dialog } from '@blueprintjs/core';

import { saveToken } from './actions';
import { Dispatch, State as ReducerState } from './reducer';

interface StateProps {
  githubToken: string;
  validGithubToken: boolean;
  validatingGithubToken: boolean;
  error?: string;
}
interface DispatchProps {
  saveGithubToken(token: string): void;
}
interface OwnProps {}
type Props = StateProps & DispatchProps & OwnProps;

interface State {
  githubToken: string;
}

class EnterGithubToken extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { githubToken: '' };
  }

  onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ githubToken: e.currentTarget.value });
  };

  saveToken = () => {
    this.props.saveGithubToken(this.state.githubToken);
  };

  render() {
    if (this.props.validGithubToken) {
      return null;
    }

    const inputClasses = this.props.error ? 'pt-intent-danger' : '';

    return (
      <Dialog
        isOpen={true}
        title="Please input your github token"
        isCloseButtonShown={false}
      >
        <div className="pt-dialog-body">
          <input
            type="text"
            className={'pt-input pt-fill ' + inputClasses}
            placeholder="Github token goes here"
            value={this.state.githubToken}
            onChange={this.onChange}
            disabled={this.props.validatingGithubToken}
          />
          {this.props.error &&
            <div className="pt-callout pt-intent-danger">
              {this.props.error}
            </div>}
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button
              disabled={this.props.validatingGithubToken}
              text="Save"
              onClick={this.saveToken}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

function mapStateToProps(state: ReducerState): StateProps {
  return {
    githubToken: state.githubToken,
    validGithubToken: state.validGithubToken,
    validatingGithubToken: state.validatingGithubToken,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators({ saveGithubToken: saveToken }, dispatch);
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EnterGithubToken);
