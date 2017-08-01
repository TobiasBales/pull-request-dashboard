import * as React from 'react';

import ReloadRepositories from './ReloadRepositories';
import Repositories from './Repositories';

const Settings: React.SFC<{}> = () => {
  return (
    <div style={{ marginTop: '64px' }}>
      <ReloadRepositories />
      <Repositories />
    </div>
  );
};

export default Settings;
