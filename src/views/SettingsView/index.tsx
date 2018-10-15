import * as React from 'react';
import { SettingsContext } from 'src/context/SettingsContext';
import { SettingsContainer } from './containers/SettingsContainer';

interface State {
  accessToken: string;
  accessTokenValid: boolean;
}

export class SettingsView extends React.Component<{}, State> {
  public render() {
    return (
      <SettingsContext.Consumer>
        {settings => <SettingsContainer settings={settings} />}
      </SettingsContext.Consumer>
    );
  }
}
