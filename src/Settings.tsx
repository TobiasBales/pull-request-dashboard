import * as React from 'react';

import ReloadRepositories from './ReloadRepositories';
import Repositories from './Repositories';

const Settings: React.SFC<{}> = () => {
  return (
    <div>
      <ReloadRepositories />
      <Repositories />
    </div>
  );
};

export default Settings;
