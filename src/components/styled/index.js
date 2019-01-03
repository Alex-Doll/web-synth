import styled from 'styled-components';

export const Button = styled.button`
  background-color: black;
  color: white;
  border-radius: 0;
  border: 1px solid black;
`;

export const Label = styled.label`
  font-family: 'Roboto';
  font-size: 18px;
`;

export const ColumnFieldset = styled.section`
  background-color: #f3f3f3;
  color: #736f66;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #736f66;
  padding: 10px;
  margin: 10px;
`;

export const LabeledInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
`;

export const FieldsetHeader = styled.h3`
  font-weight: normal; 
  font-style: italic;
  text-transform: uppercase;
  margin: 3px auto;
  font-size: 16px;
`;

export const Select = styled.select`
  margin: 4px;
  padding: 4px;
  background-color: #736f66;
  color: #f3f3f3;
  font-size: 16px;
  border: 1px solid #736f66;
  border-radius: 0;
  font-family: 'Roboto', sans-serif;
`;

export const Option = styled.option`
  font-family: 'Roboto', sans-serif;
`;
