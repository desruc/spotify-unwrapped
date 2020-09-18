import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdTrendingFlat } from 'react-icons/md';

import Flex from '../Common/Flex';
import Card from '../Common/Card';
import RangeTabs from '../Common/RangeTabs';

const Section = styled.section`
  margin: 20px 0px;
  @media (min-width: 768px) {
    margin: 40px 0px;
  }
`;

const TitleWrap = styled.div`
  margin-bottom: 16px;
  flex-wrap: wrap;
  display: flex;
  @media (min-width: 768px) {
    align-items: center;
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 16px;
  @media (min-width: 768px) {
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
}) => (
  <Section id={id}>
    <TitleWrap>
      <Heading>{heading}</Heading>
      {showRange && actionType && selectedRange && (
        <RangeTabs actionType={actionType} selected={selectedRange} />
      )}
    </TitleWrap>
    <Card>{children}</Card>
    {seeMoreLink && (
      <Flex alignItems="center" justifyContent="flex-end" mt={20}>
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
