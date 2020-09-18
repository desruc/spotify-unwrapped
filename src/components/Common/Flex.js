import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  flex-wrap: ${({ flexWrap }) => flexWrap || 'no-wrap'};
  width: ${({ width }) => width || '100%'};
  ${({ mt }) => mt && `margin-top: ${mt}px;`}
  flex: ${({ flex }) => flex || 'none'};
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  padding-right: ${({ paddingRight }) => paddingRight || '0px'};
  padding: ${({ padding }) => padding || '0px'};
  height: ${({ height }) => height || 'auto'};
  margin-bottom: ${({ mb }) => mb || '0px'};
  margin-top: ${({ mt }) => mt || '0px'};
  margin-right: ${({ mr }) => mr || '0px'};
  margin-left: ${({ ml }) => ml || '0px'};
`;

export default Flex;
