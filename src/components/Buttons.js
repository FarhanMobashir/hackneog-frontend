import styled from "styled-components";
import { primaryColor } from "../utils/colors";

export const BasicButton = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export const PrimaryButton = styled(BasicButton)`
  background-color: ${primaryColor[300]};
  color: white;
`;

export const OutlineButton = styled(BasicButton)`
  border: 1px solid ${primaryColor[300]};
  color: ${primaryColor[300]};
`;
