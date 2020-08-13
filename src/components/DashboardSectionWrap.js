import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Flex from './Flex';
import RangeTabs from './RangeTabs';

const Section = styled.section`
  margin: 60px 0px;
`;

const TitleWrap = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0px;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    margin: 0px;
    flex: 1;
    ${({ showRange }) => showRange && 'line-height: 1'};
  }
`;

const Container = styled.div`
  background-color: #eaeaea;
  border-radius: 6px;
  ${({ showRange }) => showRange && 'border-top-right-radius: 0px'};
  ${({ showRange }) => showRange && 'border-top-left-radius: 0px'};
  @media (min-width: 768px) {
    ${({ showRange }) => showRange && 'border-top-left-radius: 6px'};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
  padding: 8px 16px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  font-weight: 600;
  display: block;
  text-decoration: none !important;
  &:hover {
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const DashboardSectionWrap = ({
  id,
  heading,
  showRange,
  actionType,
  selectedRange,
  children,
  seeMoreLink,
}) => (
  <Section id={id}>
    <TitleWrap>
      <Heading showRange={showRange}>{heading}</Heading>
      {showRange && actionType && selectedRange && (
        <RangeTabs actionType={actionType} selected={selectedRange} folderStyle />
      )}
    </TitleWrap>
    <Container showRange={showRange}>{children}</Container>
    {seeMoreLink && (
      <Flex justifyCenter alignCenter mt={20}>
        <StyledLink to={seeMoreLink}>See more</StyledLink>
      </Flex>
    )}
  </Section>
);

DashboardSectionWrap.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string,
  showRange: PropTypes.bool,
  actionType: PropTypes.string,
  selectedRange: PropTypes.string,
  children: PropTypes.node.isRequired,
  seeMoreLink: PropTypes.string,
};

DashboardSectionWrap.defaultProps = {
  id: '',
  heading: '',
  showRange: false,
  actionType: '',
  selectedRange: '',
  seeMoreLink: '',
};

export default DashboardSectionWrap;
