import * as React from 'react';
import { AppBar, Button, Toolbar } from 'material-ui';

const Navgation: React.SFC<{}> = () => {
  return (
    <AppBar>
      <Toolbar>
        <Button color="contrast" href="/">
          Some
        </Button>
        <Button color="contrast" href="/settings">
          Settings
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navgation;
