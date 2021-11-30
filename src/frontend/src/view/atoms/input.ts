import styled from "styled-components";
import { color, fontSize, fontWeight, margins } from "../../design-system";

interface InputProps {
  customColor?: string;
}

export const Input = styled.input<InputProps>`
  ${({ customColor }): string => `color: ${customColor || color.grey};`};
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.subtitle};
  background-color: transparent;

  -moz-appearance: textfield;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    opacity: 0.4;
  }
  ${({ customColor }): string => `border: 1px solid ${customColor || color.grey};`};
  box-sizing: border-box;
  border-radius: 3px;
  padding: ${margins.mini};
`;

export const FieldTextArea = styled.textarea<InputProps>`
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
  ${({ customColor }): string => `color: ${customColor || color.grey};`};
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.subtitle};
  background-color: transparent;
  ::placeholder {
    opacity: 0.4;
  }
  ${({ customColor }): string => `border: 1px solid ${customColor || color.grey};`};
  box-sizing: border-box;
  border-radius: 3px;
  padding: ${margins.mini};
`;
