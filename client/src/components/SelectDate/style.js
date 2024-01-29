import styled from 'styled-components';

export const Select = styled.select`
  background: white;
  color: gray;
  font-size: 14px;
  border: 1px solid black;
  border-color: #dee2e6;
  outline: none;
  box-sizing: border-box !important;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    border: none;
    box-shadow: 1px 1px 1px gray;
  }
`;
