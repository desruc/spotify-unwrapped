import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';

import { parseAudioFeatures } from '../utils/helpers';

// Blank data for loading state
const emptyData = [
  {
    id: 'Acousticness',
    value: 0,
    color: 'hsl(254.8,83.3%,64.7%)',
  },
  {
    id: 'Danceability',
    value: 0,
    color: 'hsl(155.2,61.1%,44.3%)',
  },
  {
    id: 'Energy',
    value: 0,
    color: 'hsl(275.4,100%,73.7%)',
  },
  {
    id: 'Instrumentalness',
    value: 0,
    color: 'hsl(354.2,79.4%,62%)',
  },
  {
    id: 'Liveness',
    value: 0,
    color: 'hsl(200,53.8%,92.4%)',
  },
  {
    id: 'Speechiness',
    label: 'Speechiness',
    value: 0,
    color: 'hsl(199.8,100%,61.4%)',
  },
  {
    id: 'Valence',
    value: 0,
    color: 'hsl(60.3,92%,61%)',
  },
];

// Custom tick to fit long labels
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

const Card = styled.div`
  width: 100%;
  height: 100%;
  max-width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
`;

const Heading = styled.h2`
  margin-top: 0px;
`;

const Error = styled.h4`
  padding: 16px;
  text-align: center;
`;

const AudioFeatures = ({ loading, error, data }) => {
  const computedData = loading || !data ? emptyData : parseAudioFeatures(data);
  const getColor = (bar) => bar.data.color;

  return (
    <section id="audio-features">
      <Heading>Audio Features</Heading>
      <Card>
        {error ? (
          <Error>There was an error retrieving the audio features.</Error>
        ) : (
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
        )}
      </Card>
    </section>
  );
};

AudioFeatures.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
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
  error: false,
  data: [],
};

export default AudioFeatures;
