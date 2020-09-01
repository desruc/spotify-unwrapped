import React from 'react';
import styled from 'styled-components';

import keyframes from '../styles/keyframes';

const AlbumWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

const AlbumImage = styled.div`
  height: 140px;
  width: 140px;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  color: ${({ theme }) => theme.secondary};
  @media (min-width: 768px) {
    height: 180px;
    width: 180px;
  }
`;

const AlbumTitle = styled.h5`
  transition: all 0.2s ease-in-out;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
  background-color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  color: ${({ theme }) => theme.secondary};
`;

const AlbumYear = styled.h6`
  transition: all 0.2s ease-in-out;
  margin: 0;
  text-align: center;
  user-select: none;
  background-color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  color: ${({ theme }) => theme.secondary};
`;

const AlbumLoading = () => (
  <AlbumWrap>
    <AlbumImage />
    <AlbumTitle>Loading</AlbumTitle>
    <AlbumYear>Loading</AlbumYear>
  </AlbumWrap>
);

export default AlbumLoading;
