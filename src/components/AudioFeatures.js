import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';

import { parseAudioFeatures } from '../utils/helpers';

const CustomTick = (tick) => {
  const theme = useContext(ThemeContext);

  return (
    <g transform={`translate(${tick.x - 60},${tick.y})`}>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fill: theme.text,
          fontSize: 12,
        }}
      >
        {tick.value}
      </text>
    </g>
  );
};

const GraphWrap = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
`;

const AudioFeatures = ({ data }) => {
  const computedData = parseAudioFeatures(data);
  const getColor = (bar) => bar.data.color;

  return (
    <section id="audio-features">
      <h2>Audio Features</h2>
      <GraphWrap>
        <ResponsiveBar
          data={computedData}
          margin={{ top: 50, right: 32, bottom: 50, left: 136 }}
          padding={0.2}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          colors={getColor}
          axisTop={null}
          axisRight={null}
          borderRadius={6}
          borderWidth={2}
          layout="horizontal"
          axisBottom={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40,
            renderTick: CustomTick,
          }}
          tooltip={({ indexValue, value, color }) => (
            <strong style={{ color }}>
              {indexValue}: {value}
            </strong>
          )}
          theme={{
            tooltip: {
              container: {
                background: '#333',
              },
            },
          }}
          enableLabel={false}
          animate
          motionStiffness={90}
          motionDamping={15}
        />
      </GraphWrap>
    </section>
  );
};

AudioFeatures.propTypes = {
  data: PropTypes.shape({
    acousticness: PropTypes.number,
    analysis_url: PropTypes.string,
    danceability: PropTypes.number,
    duration_ms: PropTypes.number,
    energy: PropTypes.number,
    id: PropTypes.string,
    instrumentalness: PropTypes.number,
    key: PropTypes.number,
    liveness: PropTypes.number,
    loudness: PropTypes.number,
    mode: PropTypes.number,
    speechniess: PropTypes.number,
    tempo: PropTypes.number,
    time_signature: PropTypes.number,
    track_href: PropTypes.string,
    type: PropTypes.string,
    uri: PropTypes.string,
    valence: PropTypes.number,
  }),
};

AudioFeatures.defaultProps = {
  data: [],
};

export default AudioFeatures;
