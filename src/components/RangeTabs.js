import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Flex from './Flex';

const FolderTab = styled.div`
  cursor: pointer;
  padding: 10px;
  background-color: #eaeaea;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  user-select: none;
  color: ${({ selected, theme }) => (selected ? theme.main : '#000000')};
  font-weight: ${({ selected }) => (selected ? '600' : '400')};
  background-color: ${({ selected }) => (selected ? 'orange' : '#eaeaea')};
  font-size: 14px;
  flex-basis: calc(33.33333333333333% - 20px);
  height: 42px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    height: auto;
    flex-basis: auto;
    font-size: 16px;
  }
`;

const Tab = styled.div`
  cursor: pointer;
  margin: 5px;
  user-select: none;
  height: 42px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: ${({ selected, theme }) => (selected ? theme.main : '#000000')};
`;

const RangeTabs = ({ actionType, selected, folderStyle }) => {
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

  const ComputedComponent = folderStyle ? FolderTab : Tab;

  return (
    <Flex>
      <ComputedComponent
        onClick={() => handleClick('allTime')}
        selected={isAllTime}
      >
        All Time
      </ComputedComponent>
      <ComputedComponent
        onClick={() => handleClick('halfYear')}
        selected={isSixMonths}
      >
        Past Six Months
      </ComputedComponent>
      <ComputedComponent
        onClick={() => handleClick('month')}
        selected={isMonth}
      >
        Past Month
      </ComputedComponent>
    </Flex>
  );
};

RangeTabs.propTypes = {
  actionType: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  folderStyle: PropTypes.bool,
};

RangeTabs.defaultProps = {
  folderStyle: false,
};

export default RangeTabs;
