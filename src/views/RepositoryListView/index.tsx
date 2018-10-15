import * as React from 'react';

import { withValidGithubToken } from '../../containers/withValidGithubToken';
import { SettingsContext } from '../../context/SettingsContext';
import { PullRequestsList } from './components/PullRequestsList';

export class BasicRepositoryListView extends React.Component {
  public render() {
    return (
      <SettingsContext.Consumer>
        {settings => {
          const repositories = settings.repositories;
          repositories.sort((a, b) => {
            if (a.owner !== b.owner) {
              return a.owner.localeCompare(b.owner);
            }

            return a.name.localeCompare(b.owner);
          });

          return (
            <div className="repository-list-view">
              {repositories.map(repo => (
                <PullRequestsList
                  key={`${repo.owner}/${repo.name}`}
                  repository={repo}
                />
              ))}
            </div>
          );
        }}
      </SettingsContext.Consumer>
    );
  }
}

export const RepositoryListView = withValidGithubToken(BasicRepositoryListView);
