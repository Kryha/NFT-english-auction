import styled from "styled-components";
import { color } from "../../design-system";

interface RoundBoxProps {
  disabled?: boolean;
}

export const RoundBox = styled.div<RoundBoxProps>`
  background-color: ${color.white};
  border-radius: 10px;
  ${({ disabled }): string => {
    return disabled
      ? `
        && {
          cursor: default;
          opacity: 0.5
        }
      `
      : "";
  }};
`;

interface FlexBoxContainerProps {
  size?: number;
}

export const FlexBoxContainer = styled.div<FlexBoxContainerProps>`
  ${({ size }): string => {
    return size
      ? `
      &&& {
        flex: ${size}
      }
      `
      : "flex: 1 ";
  }}
`;
