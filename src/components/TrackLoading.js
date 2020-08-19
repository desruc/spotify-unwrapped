import React from 'react';
import styled from 'styled-components';

import keyframes from '../styles/keyframes';

const ListItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  position: relative;
  margin: 5px auto;
`;

const Container = styled.div`
  flex: 1;
  max-width: 700px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  min-height: 57px;
  background-color: transparent;
  border-radius: 0px;
  transition: all 0.1s ease-in-out;
  border-bottom: 1px solid transparent;
  img {
    width: 100%;
    max-width: 100%;
  }
`;

const Meta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
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

const Text = styled.span`
  font-size: 12px;
  background-color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  color: ${({ theme }) => theme.secondary};
`;

const TrackLoading = () => (
  <ListItem>
    <Container>
      <Image />
      <Meta>
        <div>
          <Text>Loading</Text>
          <div>
            <Text>Loading... Loading... Loading...</Text>
          </div>
        </div>
        <div>
          <Text>Loading</Text>
        </div>
      </Meta>
    </Container>
  </ListItem>
);

export default TrackLoading;
