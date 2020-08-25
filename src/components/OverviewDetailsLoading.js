import React from 'react';
import styled from 'styled-components';

import keyframes from '../styles/keyframes';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    flex-wrap: no-wrap;
    justify-content: flex-start;
  }
`;

const Inner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  @media (min-width: 768px) {
    text-align: start;
    margin-top: 0px;
    justify-content: flex-start;
    align-items: start;
  }
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  @media (min-width: 768px) {
    margin-right: 24px;
  }
`;

const Heading = styled.h2`
  font-size: 42px;
  margin-bottom: 5px;
  margin-top: 0;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
`;

const Text = styled.span`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  margin-bottom: 5px;
`;

const OverviewDetailsLoading = () => (
  <Wrap>
    <Image />
    <Inner>
      <Heading>The heading is loading</Heading>
      <Text>Please hold while we load your data</Text>
      <Text>Loading...</Text>
    </Inner>
  </Wrap>
);

export default OverviewDetailsLoading;
