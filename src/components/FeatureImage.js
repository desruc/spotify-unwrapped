import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;
  @media (min-width: 768px) {
    flex-basis: ${({ featured }) => (featured ? `33.33333333333333%;` : `25%`)};
  }
  @media (min-width: 992px) {
    flex-basis: ${({ featured }) => (featured ? `25%` : `14.28571428571429%`)};
  }
`;

const ImageWrap = styled.div`
  height: 170px;
  width: 100%;
  @media (min-width: 768px) {
    ${({ featured }) => featured && `height: 330px;`}
  }
  @media (min-width: 992px) {
    ${({ featured }) => !featured && `height: 200px;`}
  }
`;

const Image = styled.div`
  cursor: pointer;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  border-radius: 6px;
  background-size: cover;
  background-position: center top;
  background-image: url(${({ image }) => image});
  margin: 5px;
  position: relative;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const HoverContent = styled.div`
  display: none;
  @media (min-width: 992px) {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    z-index: 1;
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    min-width: 0;
    flex-direction: column;
    &:hover {
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  user-select: none;
  z-index: 1;
  color: ${({ theme }) => theme.heading};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubTitle = styled.h3`
  user-select: none;
  z-index: 1;
  color: ${({ theme }) => theme.tertiary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtistMobileLabel = styled.h6`
  text-align: center;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: ${({ isArtist }) => (isArtist ? 16 : 12)}px;
  padding: 0px 8px;
  color: ${({ theme, isArtist }) =>
    isArtist ? theme.heading : theme.secondary};
  @media (min-width: 992px) {
    display: none;
  }
`;

const AlbumMobileLabel = styled.h6`
  text-align: center;
  font-size: 16px;
  margin: 0;
  color: ${({ theme }) => theme.heading};
  padding: 0px 8px;
  @media (min-width: 992px) {
    display: none;
  }
`;

const FeatureImage = ({ image, featured, onClick, artist, album }) => (
  <ContentWrap featured={featured}>
    <ImageWrap featured={featured}>
      <Image image={image} onClick={onClick}>
        <HoverContent>
          {album ? (
            <>
              <Title>{album}</Title>
              <SubTitle>{artist}</SubTitle>
            </>
          ) : (
            <Title isArtist>{artist}</Title>
          )}
        </HoverContent>
      </Image>
    </ImageWrap>
    {album ? (
      <>
        <AlbumMobileLabel>{album}</AlbumMobileLabel>
        <ArtistMobileLabel>{artist}</ArtistMobileLabel>
      </>
    ) : (
      <ArtistMobileLabel isArtist>{artist}</ArtistMobileLabel>
    )}
  </ContentWrap>
);

FeatureImage.propTypes = {
  image: PropTypes.string.isRequired,
  featured: PropTypes.bool,
  onClick: PropTypes.func,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string,
};

FeatureImage.defaultProps = {
  featured: false,
  onClick: null,
  album: '',
};

export default FeatureImage;
