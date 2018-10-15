import {
  Button,
  ContentBox,
  ContentBoxGroup,
  Headline,
  Icon,
  IconButton,
  Input,
  LoadingIndicator,
  Table,
  TableBody,
  TableColumn,
  TableColumnAction,
  TableRow
} from '@jimdo/ui';
import * as icons from '@jimdo/ui/icon/icons';
import * as React from 'react';

import { GithubRepository } from 'src/domain/GithubRepository';
import { GithubService } from '../../../services/GithubService';
import { SettingsService } from '../../../services/SettingsService';

interface Props {
  settings: SettingsService;
}

interface State {
  accessToken: string;
  accessTokenValid: boolean;
  accessTokenValidating: boolean;
  forceChange: Date;
  name: string;
  owner: string;
}

export class SettingsContainer extends React.Component<Props, State> {
  private githubServcice = new GithubService();

  constructor(props: Props) {
    super(props);

    this.state = {
      accessToken: props.settings.accessToken,
      accessTokenValid: false,
      accessTokenValidating: true,
      forceChange: new Date(),
      name: '',
      owner: ''
    };

    this.validateToken(this.state.accessToken);
  }

  public render() {
    return (
      <div className="container">
        <ContentBoxGroup>
          <ContentBox>
            <Headline type="medium">Access token</Headline>
            <Input
              value={this.state.accessToken}
              onChange={this.changeAccessToken}
              rightElement={this.getAccessTokenInputIcon()}
            />
          </ContentBox>
          <ContentBox>
            <Headline type="medium">Repositories</Headline>
            <form onSubmit={this.addRepository}>
              <Input
                placeholder="owner"
                value={this.state.owner}
                onChange={this.changeOwner}
              />
              <Input
                placeholder="repository"
                value={this.state.name}
                onChange={this.changeName}
              />
              <Button buttonStyle="primary" onClick={this.addRepository}>
                Add repository
              </Button>
            </form>

            <Table>
              <TableBody>
                {this.props.settings.repositories.map(r => (
                  <TableRow key={`${r.owner}/${r.name}`}>
                    <TableColumn mobileLabel="owner/repo">
                      {r.owner}/{r.name}
                    </TableColumn>
                    <TableColumnAction>
                      <IconButton
                        buttonStyle="primary"
                        icon={icons.close}
                        onClick={this.deleteRepository(r)}
                      />
                    </TableColumnAction>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ContentBox>
        </ContentBoxGroup>
      </div>
    );
  }

  private getAccessTokenInputIcon() {
    if (this.state.accessTokenValidating) {
      return <LoadingIndicator color="blue" size="icon" />;
    }

    if (!this.state.accessTokenValid) {
      return <Icon className="icon-fail" icon={icons.close} />;
    }

    return <Icon className="icon-success" icon={icons.checkmark} />;
  }

  private addRepository = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    this.props.settings.addRepository({
      name: this.state.name,
      owner: this.state.owner
    });
    this.setState({ name: '', owner: '' });
  };

  private deleteRepository = (repo: GithubRepository) => (
    e: React.SyntheticEvent<HTMLElement>
  ) => {
    this.props.settings.deleteRepository(repo);
    this.setState({ forceChange: new Date() });
  };

  private changeOwner = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ owner: e.currentTarget.value });
  };

  private changeName = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ name: e.currentTarget.value });
  };

  private changeAccessToken = async (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const accessToken = e.currentTarget.value;
    this.setState({
      accessToken,
      accessTokenValid: false,
      accessTokenValidating: true
    });
    this.validateToken(accessToken);
  };

  private validateToken = async (accessToken: string) => {
    const accessTokenValid = await this.githubServcice.tokenIsValid(
      accessToken
    );

    this.setState(prevState => {
      return {
        ...prevState,
        accessTokenValid,
        accessTokenValidating: false
      };
    });

    if (accessTokenValid) {
      this.props.settings.setAccessToken(accessToken);
    }
  };
}
