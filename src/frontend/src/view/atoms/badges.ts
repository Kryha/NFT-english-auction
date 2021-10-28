import styled from "styled-components";
import { color, margins } from "../../design-system";
import hexToRgba from "hex-to-rgba";

interface BadgeProps {
  customColor?: string;
}

export const Badge = styled.span<BadgeProps>`
  mix-blend-mode: normal;
  border-radius: ${margins.mini};
  padding: ${margins.mini};
  ${({ customColor }): string => {
    return customColor
      ? `
      background-color: ${hexToRgba(customColor || color.grey, 0.3)};
      color: ${hexToRgba(customColor || color.grey)};
      `
      : "";
  }};
`;
