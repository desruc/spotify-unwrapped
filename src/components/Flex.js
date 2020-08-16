import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
  ${({ mb }) => mb && `margin-bottom: ${mb}px`}
  ${({ mt }) => mt && `margin-top: ${mt}px`}
`;

export default Flex;
