import styled from 'styled-components';
import keyframes from '../../styles/keyframes';

const LoadingBox = styled.div`
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.secondary};
  animation: ${keyframes.glow} 1.5s ease-in-out infinite;
  border-radius: ${({ borderRadius }) => borderRadius || '6px'};
  margin-bottom: ${({ mb }) => mb || '0px'};
  margin-top: ${({ mt }) => mt || '0px'};
`;

export default LoadingBox;
