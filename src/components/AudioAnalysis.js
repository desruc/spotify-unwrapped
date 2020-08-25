import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import keyframes from '../styles/keyframes';

const Section = styled.section`
  margin-top: 40px;
  @media (min-height: 768px) {
    margin-top: 0px;
  }
`;

const Loading = styled.span`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
`;

const Heading = styled.h2`
  margin-top: 0px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  padding: 16px;
  @media (min-width: 758px) {
    height: 552px;
  }
  @media (min-width: 992px) {
    height: auto;
  }
  @media (min-width: 1500px) {
    height: 552px;
  }
`;

const Error = styled.h4`
  padding: 16px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  width: 100%;
  text-align: center;
  @media (min-width: 992px) {
    grid-template-columns: repeat(5, minmax(100px, 1fr));
  }
  @media (min-width: 1500px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
`;

const AnalysisWrap = styled.div`
  padding: 15px 10px;
`;

const AnalysisText = styled.h6`
  transition: all 0.2s ease-in-out;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const AnalysisLabel = styled.p`
  margin: 0;
`;

const loadingJsx = <Loading>Loading</Loading>;

const AudioAnalysis = ({
  loading,
  error,
  duration,
  pitch,
  modality,
  timeSignature,
  tempo,
  popularity,
  bars,
  beats,
  sections,
  segments,
}) => (
  <Section>
    <Heading>Audio Analysis</Heading>
    <Card>
      {error ? (
        <Error>There was an error retrieving the audio analysis.</Error>
      ) : (
        <Grid>
          <AnalysisWrap>
            <AnalysisLabel>Duration</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : duration}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Popularity</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : popularity}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Key</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : pitch}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Modality</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : modality}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Tempo (BPM)</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : tempo}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Time Signature</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : timeSignature}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Bars</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : bars}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Beats</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : beats}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Sections</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : sections}</AnalysisText>
          </AnalysisWrap>
          <AnalysisWrap>
            <AnalysisLabel>Segments</AnalysisLabel>
            <AnalysisText>{loading ? loadingJsx : segments}</AnalysisText>
          </AnalysisWrap>
        </Grid>
      )}
    </Card>
  </Section>
);

AudioAnalysis.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  duration: PropTypes.string.isRequired,
  pitch: PropTypes.string.isRequired,
  modality: PropTypes.string.isRequired,
  timeSignature: PropTypes.string.isRequired,
  tempo: PropTypes.string.isRequired,
  popularity: PropTypes.string.isRequired,
  bars: PropTypes.number.isRequired,
  beats: PropTypes.number.isRequired,
  sections: PropTypes.number.isRequired,
  segments: PropTypes.number.isRequired,
};

export default AudioAnalysis;
