import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

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
  const onChange = (e) => {
    const { value } = e.target;
    dispatch({ type: CHANGE_DATE_RANGE, range: value });
  };

  return (
    <Container>
      <select onChange={onChange} value={range}>
        <option>allTime</option>
        <option>halfYear</option>
        <option>month</option>
      </select>
    </Container>
  );
};

export default AppBar;
