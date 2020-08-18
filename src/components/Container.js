import styled from 'styled-components';

const Container = styled.div`
  margin: 80px auto;
  max-width: 1800px;
  padding: 0px 16px;
  width: calc(100% - 32px);
  @media (min-width: 992px) {
    margin: 40px auto 80px auto;
  }
`;

export default Container;
