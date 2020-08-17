import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
`;

const AnalysisWrap = styled.div`
  padding: 15px 10px;
`;

const AnalysisText = styled.h6`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const AnalysisLabel = styled.p`
  margin: 0;
`;

const AudioAnalysis = ({
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
  <section>
    <h2>Audio Analysis</h2>
    <Card>
      <Grid>
        <AnalysisWrap>
          <AnalysisLabel>Duration</AnalysisLabel>
          <AnalysisText>{duration}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Popularity</AnalysisLabel>
          <AnalysisText>{popularity}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Key</AnalysisLabel>
          <AnalysisText>{pitch}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Modality</AnalysisLabel>
          <AnalysisText>{modality}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Tempo (BPM)</AnalysisLabel>
          <AnalysisText>{tempo}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Time Signature</AnalysisLabel>
          <AnalysisText>{timeSignature}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Bars</AnalysisLabel>
          <AnalysisText>{bars}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Beats</AnalysisLabel>
          <AnalysisText>{beats}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Sections</AnalysisLabel>
          <AnalysisText>{sections}</AnalysisText>
        </AnalysisWrap>
        <AnalysisWrap>
          <AnalysisLabel>Segments</AnalysisLabel>
          <AnalysisText>{segments}</AnalysisText>
        </AnalysisWrap>
      </Grid>
    </Card>
  </section>
);

AudioAnalysis.propTypes = {
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
