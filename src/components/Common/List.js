import styled from 'styled-components';

const List = styled.ul`
  transition: width 0.2s ease-in-out;
  margin: 0;
  padding: 0;
  list-style: none;
  columns: 1;
  @media (min-width: 768px) {
    ${({ twoColumns }) => twoColumns && 'columns: 2;'}
  }
`;

export default List;
