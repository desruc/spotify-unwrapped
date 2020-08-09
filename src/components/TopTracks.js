import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectTopTracks, selectTrackRange } from '../store/reducer';
import { CHANGE_TRACK_DATE_RANGE } from '../store/types';

import Flex from './Flex';
import SlideToggleContent from './SlideToggleContent';
import Button from './Button';
import RangeSelector from './RangeSelector';
import Track from './Track';

const Section = styled.section`
  margin: 60px 0px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0px;
  flex: 1;
  margin-bottom: 20px;
`;

const List = styled.ul`
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0;
  list-style: none;
  @media (min-width: 992px) {
    columns: 2;
  }
`;

const TopTracks = () => {
  // Local
  const [showAll, setShowAll] = useState(false);

  // Redux
  const range = useSelector((state) => selectTrackRange(state));
  const tracks = useSelector((state) => selectTopTracks(state));

  // Event handlers
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  // Constants
  const computedTracks = tracks[range];

  return (
    <Section>
      <Flex>
        <Heading>Top Tracks</Heading>
        <RangeSelector type={CHANGE_TRACK_DATE_RANGE} value={range} />
      </Flex>
      {showAll && <h5>Top 10</h5>}
      <List>
        {computedTracks &&
          computedTracks
            .slice(0, 10)
            .map((track) => <Track key={track.id} track={track} />)}
      </List>
      <SlideToggleContent isVisible={showAll}>
        <h5>11 - 50</h5>
        <List>
          {computedTracks &&
            computedTracks
              .slice(10)
              .map((track) => <Track key={track.id} track={track} />)}
        </List>
      </SlideToggleContent>
      <Flex justifyCenter alignCenter mt={20}>
        <Button onClick={handleShowAll}>
          {showAll ? 'Show less' : 'Show more'}
        </Button>
      </Flex>
    </Section>
  );
};

export default TopTracks;
