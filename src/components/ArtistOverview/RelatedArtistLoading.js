import React from 'react';
import styled from 'styled-components';

import keyframes from '../../styles/keyframes';

const ListItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Container = styled.div`
  flex: 1;
  max-width: 700px;
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
  background-color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  color: ${({ theme }) => theme.secondary};
`;

const RelatedArtistLoading = () => (
  <ListItem>
    <Container>
      <Image />
      <Text>Loading</Text>
    </Container>
  </ListItem>
);

export default RelatedArtistLoading;
