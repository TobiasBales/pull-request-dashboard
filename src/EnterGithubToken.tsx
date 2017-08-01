import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from 'material-ui';

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

    return (
      <Dialog>
        <DialogTitle>Please input your github token</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Github token goes here"
            error={!!this.props.error}
            value={this.state.githubToken}
            onChange={this.onChange}
            disabled={this.props.validatingGithubToken}
          />
          {this.props.error &&
            <DialogContentText>
              {this.props.error}
            </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={this.props.validatingGithubToken}
            onClick={this.saveToken}
          >
            Save
          </Button>
        </DialogActions>
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
