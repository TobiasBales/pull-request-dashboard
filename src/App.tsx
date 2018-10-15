import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SettingsContainer } from './containers/SettingsContainer';
import { SettingsContext } from './context/SettingsContext';
import { createClient } from './graphql/client';
import { RepositoryListView } from './views/RepositoryListView';

import './App.css';
import { SettingsView } from './views/SettingsView';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <SettingsContainer>
          <SettingsContext.Consumer>
            {settings => {
              return (
                <ApolloProvider client={createClient(settings.accessToken)}>
                  <div className="App">
                    <Switch>
                      <Route path="/settings" component={SettingsView} />
                      <Route path="/" component={RepositoryListView} />
                    </Switch>
                  </div>
                </ApolloProvider>
              );
            }}
          </SettingsContext.Consumer>
        </SettingsContainer>
      </BrowserRouter>
    );
  }
}

export default App;
