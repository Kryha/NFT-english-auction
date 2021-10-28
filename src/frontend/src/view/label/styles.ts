import styled from "styled-components";
import { Label, FlexBoxContainer } from "../";
import { color, margins } from "../../design-system";

interface LabeledDataProps {
  customColor?: string;
  disabled?: boolean;
}

export const Container = styled(FlexBoxContainer)<LabeledDataProps>`
  display: flex;
  flex-wrap: wrap;

  color: ${({ customColor }): string => customColor || color.black};
  ${({ disabled }): string => {
    return disabled
      ? `
        opacity: 0.4;
      `
      : "";
  }}

  ${Label} {
    width: 100%;
  }
`;

export const DataLabel = styled(Label)`
  margin-bottom: ${margins.nano};
  text-transform: uppercase;
`;
