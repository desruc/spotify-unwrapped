import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Dropdown from './Dropdown';

import { CHANGE_DATE_RANGE } from '../store/types';
import { selectRange } from '../store/reducer';

const Container = styled.div`
  height: 91px;
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const AppBar = () => {
  // Hooks
  const dispatch = useDispatch();

  // Redux
  const range = useSelector((state) => selectRange(state));

  // Event handlers
  const onChange = (value) => {
    console.log("onChange -> value", value)
    dispatch({ type: CHANGE_DATE_RANGE, range: value });
  };

  // Constants
  const options = [
    {
      value: 'allTime',
      label: 'All Time',
    },
    {
      value: 'halfYear',
      label: 'Last Six Months',
    },
    {
      value: 'month',
      label: 'Last 4 Weeks',
    },
  ];

  return (
    <Container>
      <Dropdown options={options} value={range} onSelect={onChange} />
    </Container>
  );
};

export default AppBar;
