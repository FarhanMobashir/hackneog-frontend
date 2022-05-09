import styled from "styled-components";
import { neutral, primaryColor } from "../utils";

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px 0px;
`;
const Input = styled.input`
  border: 2px solid ${neutral[300]};
  padding: 10px 8px;
  border-radius: 5px;
  &:focus {
    outline: 1px solid ${primaryColor[400]};
    border: 1px solid ${primaryColor[400]};
  }
`;

const ErrorText = styled.small``;

export const TextField = ({
  onChange,
  value,
  label,
  type,
  placeholder,
  errorText = "",
  required = false,
}) => {
  return (
    <Label>
      {required ? label + "*" : label}
      <Input
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      <ErrorText>{errorText}</ErrorText>
    </Label>
  );
};
