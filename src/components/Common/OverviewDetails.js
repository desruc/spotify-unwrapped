import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorMessage from './ErrorMessage';
import OverviewDetailsLoading from './OverviewDetailsLoading';
import ButtonLink from './ButtonLink';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
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
  width: 290px;
  height: 290px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  background-size: cover;
  background-position: center center;
  background-image: url(${({ image }) => image});
  @media (min-width: 768px) {
    margin-right: 24px;
  }
`;

const Heading = styled.h2`
  line-height: 1;
  font-size: 42px;
  margin-bottom: 5px;
`;

const OverviewDetails = ({
  imageSrc,
  heading,
  spotifyUrl,
  children,
  loading,
  error,
}) => {
  if (loading) return <OverviewDetailsLoading />;

  if (!loading && error)
    return (
      <ErrorMessage>
        There was an error retrieving the data. Please refresh the page.
      </ErrorMessage>
    );

  return (
    <Wrap>
      {imageSrc && <Image image={imageSrc} />}
      <Inner>
        <Heading>{heading}</Heading>
        {children}
        {spotifyUrl && (
          <ButtonLink
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Spotify
          </ButtonLink>
        )}
      </Inner>
    </Wrap>
  );
};

OverviewDetails.propTypes = {
  loading: PropTypes.bool,
  imageSrc: PropTypes.string,
  heading: PropTypes.string,
  spotifyUrl: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.bool,
};

OverviewDetails.defaultProps = {
  loading: false,
  imageSrc: '',
  heading: '',
  spotifyUrl: '',
  children: null,
  error: false,
};

export default OverviewDetails;
