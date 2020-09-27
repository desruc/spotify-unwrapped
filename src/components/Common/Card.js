import styled from 'styled-components';

const Card = styled.div`
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 10px;
  padding: ${({ padding }) => padding || '16px'};
  display: ${({ display }) => display || 'block'};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
`;

export default Card;
