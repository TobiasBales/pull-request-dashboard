import * as React from 'react';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import EnterGithubToken from './EnterGithubToken';
import Navigation from './Navigation';
import Settings from './Settings';
import Dashboard from './Dashboard';
import Error from './Error';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Error />
          <EnterGithubToken />
          <Route path="/" exact={true} component={Dashboard} />
          <Route path="/settings" exact={true} component={Settings} />
        </div>
      </Router>
    );
  }
}

export default App;
