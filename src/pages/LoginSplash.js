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

const loginUri =
  process.env.NODE_ENV === 'production'
    ? 'https://unwrapped-lpf6k5tfna-uc.a.run.app/login'
    : 'http://localhost:3000/login';

const LoginSplash = () => (
  <Wrap>
    <h1>Unwrapped</h1>
    <ButtonLink href={loginUri}>Login</ButtonLink>
  </Wrap>
);

export default LoginSplash;
