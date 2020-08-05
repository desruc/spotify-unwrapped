import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Dropdown from './Dropdown';

const RangeSelector = ({ type, value }) => {
  const dispatch = useDispatch();

  const handleRangeChange = (val) => {
    dispatch({ type, range: val });
  };

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
    <Dropdown options={options} value={value} onSelect={handleRangeChange} />
  );
};

RangeSelector.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOf(['allTime', 'halfYear', 'month']).isRequired,
};

export default RangeSelector;
