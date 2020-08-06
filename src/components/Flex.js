import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justifyCenter }) =>
    justifyCenter ? 'center' : 'flex-start'};
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : 'flex-start')};
  ${({ mb }) => mb && `margin-bottom: ${mb}px`}
  ${({ mt }) => mt && `margin-top: ${mt}px`}
`;

export default Flex;
