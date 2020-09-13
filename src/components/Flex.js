import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'no-wrap'};
  width: ${({ width }) => width || '100%'};
  ${({ mb }) => mb && `margin-bottom: ${mb}px;`}
  ${({ mt }) => mt && `margin-top: ${mt}px;`}
  flex: ${({ flex }) => flex || 'none'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  padding-right: ${({ paddingRight }) => paddingRight || '0px'};
`;

export default Flex;
