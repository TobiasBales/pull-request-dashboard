import * as React from 'react';
import { SettingsContext } from 'src/context/SettingsContext';
import { GithubRepository } from 'src/domain/GithubRepository';
import {
  SettingsRepository,
  SettingsRepositoryImpl
} from 'src/repositories/SettingsRepositories';
import { SettingsService } from 'src/services/SettingsService';

interface State {
  accessToken: string;
  repositories: GithubRepository[];
}

export class SettingsContainer extends React.Component<{}, State>
  implements SettingsService {
  private settingsRepository: SettingsRepository;

  constructor(props: {}) {
    super(props);

    this.settingsRepository = new SettingsRepositoryImpl(localStorage);

    this.state = {
      accessToken: this.settingsRepository.getAccessToken(),
      repositories: this.settingsRepository.getRepositories()
    };
  }

  public get accessToken() {
    return this.state.accessToken;
  }

  public setAccessToken(accessToken: string) {
    this.setState(prevState => {
      this.settingsRepository.setAccessToken(accessToken);

      return {
        ...prevState,
        accessToken
      };
    });
  }

  public get repositories() {
    return this.state.repositories;
  }

  public addRepository(repo: GithubRepository) {
    this.setState(prevState => {
      const repositories = [...prevState.repositories, repo];
      this.settingsRepository.setRepositories(repositories);

      return {
        ...prevState,
        repositories
      };
    });
  }

  public deleteRepository(repo: GithubRepository) {
    this.setState(prevState => {
      const repositories = prevState.repositories.filter(r => r !== repo);
      // tslint:disable-next-line:no-console
      console.log('new repos', repositories);
      this.settingsRepository.setRepositories(repositories);

      return {
        ...prevState,
        repositories
      };
    });
  }

  public render() {
    return (
      <SettingsContext.Provider value={this}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}
