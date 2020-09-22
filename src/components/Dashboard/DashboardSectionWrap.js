import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdTrendingFlat } from 'react-icons/md';

import Flex from '../Common/Flex';
import Card from '../Common/Card';
import RangeTabs from '../Common/RangeTabs';

const Section = styled.section`
  margin: ${({ margin }) => (margin ? '20px 0px' : '0px')};
  @media (min-width: 768px) {
    margin: ${({ margin }) => (margin ? '40px 0px' : '0px')};
  }
`;

const TitleWrap = styled.div`
  margin-bottom: 16px;
  @media (min-width: 768px) {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: ${({ showRange }) => (showRange ? '16px' : '0px')};
  @media (min-width: 768px) {
    margin-bottom: 0px;
    flex: 1;
  }
`;

const StyledLink = styled(Link)`
  width: fit-content;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  text-decoration: none !important;
  align-items: center;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => theme.main};
  }
  svg {
    margin-left: 5px;
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
  cardPadding,
  noSectionMargin,
}) => (
  <Section margin={!noSectionMargin} id={id}>
    <TitleWrap>
      <Heading showRange={showRange}>{heading}</Heading>
      {showRange && actionType && selectedRange && (
        <RangeTabs actionType={actionType} selected={selectedRange} />
      )}
    </TitleWrap>
    <Card padding={cardPadding}>{children}</Card>
    {seeMoreLink && (
      <Flex alignItems="center" justifyContent="flex-end" mt="20px">
        <StyledLink to={seeMoreLink}>
          See more <MdTrendingFlat />
        </StyledLink>
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
  cardPadding: PropTypes.string,
  noSectionMargin: PropTypes.bool,
};

DashboardSectionWrap.defaultProps = {
  id: '',
  heading: '',
  showRange: false,
  actionType: '',
  selectedRange: '',
  seeMoreLink: '',
  cardPadding: '16px',
  noSectionMargin: false,
};

export default DashboardSectionWrap;
