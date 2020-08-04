import styled from 'styled-components';

const Button = styled.div`
  width: fit-content;
  padding: 8px 16px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  font-weight: 600;
  display: block;
  text-decoration: none !important;
  &:hover {
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

export default Button;
