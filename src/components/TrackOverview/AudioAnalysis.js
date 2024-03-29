import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorMessage from '../Common/ErrorMessage';
import Card from '../Common/Card';

import keyframes from '../../styles/keyframes';

const Loading = styled.span`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
`;

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 758px) {
    height: 552px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  width: 100%;
  text-align: center;
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
  <section id="audio-analysis">
    <h2>Audio Analysis</h2>
    <StyledCard>
      {error ? (
        <ErrorMessage>
          There was an error retrieving the audio analysis.
        </ErrorMessage>
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
    </StyledCard>
  </section>
);

AudioAnalysis.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  duration: PropTypes.string,
  pitch: PropTypes.string,
  modality: PropTypes.string,
  timeSignature: PropTypes.number,
  tempo: PropTypes.number,
  popularity: PropTypes.number,
  bars: PropTypes.number,
  beats: PropTypes.number,
  sections: PropTypes.number,
  segments: PropTypes.number,
};

AudioAnalysis.defaultProps = {
  duration: '',
  pitch: '',
  modality: '',
  timeSignature: 0,
  tempo: 0,
  popularity: 0,
  bars: 0,
  beats: 0,
  sections: 0,
  segments: 0,
};

export default AudioAnalysis;
