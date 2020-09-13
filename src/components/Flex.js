import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
  ${({ wrap }) => wrap && `flex-wrap: wrap;`}
  ${({ mb }) => mb && `margin-bottom: ${mb}px;`}
  ${({ mt }) => mt && `margin-top: ${mt}px;`}
  ${({ fullWidth }) => fullWidth && `width: 100%;`}
  ${({ flexOne }) => flexOne && `flex: 1;`}
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  padding-right: ${({ paddingRight }) => paddingRight || '0px'};
`;

export default Flex;
