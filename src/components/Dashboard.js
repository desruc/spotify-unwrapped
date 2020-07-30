import React from 'react';

import { clearTokens } from '../utils/tokenHelpers';

const Dashbaord = () => (
  <div>
    <h1 onClick={clearTokens} role="presentation">
      Logout
    </h1>
  </div>
);

export default Dashbaord;
