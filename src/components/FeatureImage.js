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
    display: block;
    position: absolute;
    top: 0;
    height: calc(100% - 32px);
    width: calc(100% - 32px);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    z-index: 1;
    padding: 16px;
    display: flex;
    align-items: flex-end;
    min-width: 0;
    &:hover {
      opacity: 1;
    }
  }
`;

const Label = styled.h1`
  user-select: none;
  z-index: 1;
  color: #ffffff;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileLabel = styled.div`
  text-align: center;
  @media (min-width: 992px) {
    display: none;
  }
`;

const FeatureImage = ({ image, label, featured }) => (
  <ContentWrap featured={featured}>
    <ImageWrap featured={featured}>
      <Image image={image}>
        <HoverContent>
          <Label>{label}</Label>
        </HoverContent>
      </Image>
    </ImageWrap>
    <MobileLabel>{label}</MobileLabel>
  </ContentWrap>
);

FeatureImage.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  featured: PropTypes.bool,
};

FeatureImage.defaultProps = {
  featured: false,
};

export default FeatureImage;
