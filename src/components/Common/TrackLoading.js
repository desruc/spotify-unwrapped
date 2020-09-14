import React from 'react';
import styled from 'styled-components';

import Flex from './Flex';

import keyframes from '../../styles/keyframes';
import mixins from '../../styles/mixins';

const ListItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Container = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  min-height: 55px;
  background-color: transparent;
  border-radius: 0px;
  transition: all 0.1s ease-in-out;
  border-bottom: 1px solid transparent;
  margin: 5px;
  img {
    width: 100%;
    max-width: 100%;
  }
`;

const Meta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  min-height: 55px;
  grid-gap: 10px;
`;

const Image = styled.div`
  width: 50px;
  margin-right: 20px;
  height: 50px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  border-radius: 6px;
`;

const Text = styled.div`
  height: 12px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  color: ${({ theme }) => theme.secondary};
  width: 100%;
  margin-bottom: ${({ mb }) => mb || 0};
  ${mixins.overflowEllipsis}
`;

const TrackLoading = () => (
  <ListItem>
    <Container>
      <Image />
      <Meta>
        <Flex flexDirection="column" justifyContent="center">
          <Text mb="5px" />
          <Text />
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Text justify>0:00</Text>
        </Flex>
      </Meta>
    </Container>
  </ListItem>
);

export default TrackLoading;
