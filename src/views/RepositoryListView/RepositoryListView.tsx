import * as React from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { PullRequestsList } from './components/PullRequestsList';

export class RepositoryListView extends React.Component {
  public render() {
    return (
      <SettingsContext.Consumer>
        {settings => {
          return (
            <div className="repository-list-view">
              {settings.repositories.map(repo => (
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
