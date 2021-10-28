import styled from "styled-components";
import { color, fontSize, fontWeight, margins } from "../../design-system";

export const Input = styled.input`
  color: ${color.grey};
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.subtitle};
  background-color: transparent;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  border-color: ${color.grey};
  ::placeholder {
    opacity: 0.4;
  }

  border: 1px solid ${color.grey};
  box-sizing: border-box;
  border-radius: 3px;
  padding: ${margins.mini};
`;
