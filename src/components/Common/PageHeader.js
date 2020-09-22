import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flex from './Flex';

const Heading = styled.h1`
  flex: 1;
  font-size: 2.5rem;
  margin-bottom: 0px;
  margin-top: 0px;
  @media (min-width: 1200px) {
    font-size: 3.5rem;
  }
`;

const PageHeader = ({ heading, actions }) => (
  <Flex mt="40px" mb="20px" alignItems="center" flexWrap="wrap">
    <Heading>{heading}</Heading>
    {actions && <div>{actions}</div>}
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
