import React from 'react';
import styled from 'styled-components';

import ButtonLink from '../components/Common/ButtonLink';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginSplash = () => (
  <Wrap>
    <h1>Unwrapped</h1>
    <ButtonLink href="http://localhost:3000/login">Login</ButtonLink>
  </Wrap>
);

export default LoginSplash;
