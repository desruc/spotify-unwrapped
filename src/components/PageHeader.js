import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flex from './Flex';

const Heading = styled.h1`
  flex: 1;
  font-size: 3.5rem;
  margin-bottom: 16px;
  margin-top: 0px;
  @media (min-width: 992px) {
    margin-bottom: 0.67em;
  }
`;

const ActionsWrap = styled.div`
  margin-bottom: 16px;
  @media (min-width: 992px) {
    margin-bottom: 0;
  }
`;

const PageHeader = ({ heading, actions }) => (
  <Flex mt={40} mb={40} align="center">
    <Heading>{heading}</Heading>
    <ActionsWrap>{actions}</ActionsWrap>
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
