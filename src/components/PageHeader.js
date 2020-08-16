import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flex from './Flex';

const Heading = styled.h1`
  flex: 1;
  font-size: 3.5rem;
`;

const PageHeader = ({ heading, actions }) => (
  <Flex mt={40} mb={40} align="center">
    <Heading>{heading}</Heading>
    {actions}
  </Flex>
);

PageHeader.propTypes = {
  heading: PropTypes.string,
  actions: PropTypes.node,
};

PageHeader.defaultProps = {
  heading: '',
  actions: null,
};

export default PageHeader;
