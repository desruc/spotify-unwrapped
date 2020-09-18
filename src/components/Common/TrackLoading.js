import React from 'react';
import styled from 'styled-components';

import Flex from './Flex';
import LoadingBox from './LoadingBox';

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

const TrackLoading = () => (
  <ListItem>
    <Container>
      <LoadingBox height="50px" width="50px" borderRadius="6px" mr="20px" />
      <Meta>
        <Flex flexDirection="column" justifyContent="center">
          <LoadingBox height="12px" mb="5px" width="55%" />
          <LoadingBox height="12px" width="30%" />
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <LoadingBox height="fit-content" fontSize="12px" justify>
            0:00
          </LoadingBox>
        </Flex>
      </Meta>
    </Container>
  </ListItem>
);

export default TrackLoading;
