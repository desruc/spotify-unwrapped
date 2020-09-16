import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  margin-top: 40px;
  font-size: 12px;
  text-transform: uppercase;
  text-align: end;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => theme.main};
  }
`;

const Footer = () => (
  <Text>
    App by{' '}
    <Link
      href="https://www.jmscmrn.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      James Cameron
    </Link>
  </Text>
);

export default Footer;
