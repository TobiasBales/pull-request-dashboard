import * as React from 'react';

import { ContentBox, LoadingDots } from '@jimdo/ui';
import { Redirect } from 'react-router';
import { GithubService } from 'src/services/GithubService';
import { SettingsContext } from '../context/SettingsContext';

interface State {
  accessToken: string;
  accessTokenValid: boolean;
  accessTokenChecked: boolean;
  accessTokenChecking: boolean;
}

export function withValidGithubToken(Component: React.ComponentType) {
  return class extends React.Component<{}, State> {
    public state = {
      accessToken: '',
      accessTokenChecked: false,
      accessTokenChecking: false,
      accessTokenValid: false
    };

    public render() {
      return (
        <SettingsContext.Consumer>
          {settings => {
            if (settings.accessToken !== this.state.accessToken) {
              this.changeAccessToken(settings.accessToken);
              return (
                <ContentBox>
                  <LoadingDots />
                </ContentBox>
              );
            }

            if (
              !this.state.accessTokenChecked &&
              !this.state.accessTokenChecking
            ) {
              this.checkAccessToken();
              return (
                <ContentBox>
                  <LoadingDots />
                </ContentBox>
              );
            }

            if (this.state.accessTokenChecking) {
              return (
                <ContentBox>
                  <LoadingDots />
                </ContentBox>
              );
            }

            if (!this.state.accessTokenValid) {
              return <Redirect to="/settings" />;
            }

            return <Component />;
          }}
        </SettingsContext.Consumer>
      );
    }

    private checkAccessToken = () => {
      setTimeout(async () => {
        const service = new GithubService();
        if (await service.tokenIsValid(this.state.accessToken)) {
          this.setState(prevState => {
            return {
              ...prevState,
              accessTokenChecked: true,
              accessTokenChecking: false,
              accessTokenValid: true
            };
          });
        } else {
          this.setState(prevState => {
            return {
              ...prevState,
              accessTokenChecked: true,
              accessTokenChecking: false,
              accessTokenValid: false
            };
          });
        }
      }, 0);
    };

    private changeAccessToken = (accessToken: string) => {
      setTimeout(() => {
        this.setState(prevState => {
          return {
            ...prevState,
            accessToken,
            accessTokenChecked: false,
            accessTokenChecking: false,
            accessTokenValid: false
          };
        });
      }, 0);
    };
  };
}
