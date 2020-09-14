import React from 'react';
import styled from 'styled-components';

import LoadingBox from '../Common/LoadingBox';
import Flex from '../Common/Flex';

const ProfileLoading = () => (
  <Flex flexDirection="column" alignItems="center">
    <LoadingBox height="100px" width="100px" borderRadius="50%" />
    <LoadingBox mt="16px" mb="16px" height="30px" width="120px" />
    <Flex flexDirection="column" alignItems="center">
      <LoadingBox width="60px" height="20px" />
      <LoadingBox width="16px" height="14px" />
    </Flex>
  </Flex>
);

export default ProfileLoading;
