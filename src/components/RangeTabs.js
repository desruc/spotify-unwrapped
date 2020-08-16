import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Flex from './Flex';

const Tab = styled.div`
  cursor: pointer;
  margin: 5px;
  user-select: none;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: ${({ selected, theme }) => (selected ? theme.heading : theme.text)};
  ${({ selected, theme }) => selected && `border-bottom: 1px solid ${theme.tertiary};`};
`;

const RangeTabs = ({ actionType, selected }) => {
  // Hooks
  const dispatch = useDispatch();

  // Event Handlers
  const handleClick = (range) => {
    dispatch({
      type: actionType,
      range,
    });
  };

  // Constants
  const isAllTime = selected === 'allTime';
  const isSixMonths = selected === 'halfYear';
  const isMonth = selected === 'month';

  return (
    <Flex>
      <Tab onClick={() => handleClick('allTime')} selected={isAllTime}>
        All Time
      </Tab>
      <Tab onClick={() => handleClick('halfYear')} selected={isSixMonths}>
        Past Six Months
      </Tab>
      <Tab onClick={() => handleClick('month')} selected={isMonth}>
        Past Month
      </Tab>
    </Flex>
  );
};

RangeTabs.propTypes = {
  actionType: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired
};

export default RangeTabs;
