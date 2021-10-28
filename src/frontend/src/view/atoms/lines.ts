import styled from "styled-components";
import { color, margins } from "../../design-system";

interface BorderProps {
  customColor?: string;
}

export const HorizontalBorder = styled.div<BorderProps>`
  height: 1px;
  width: 100%;
  ${({ customColor }): string => `background-color: ${customColor || color.grey};`};
`;

export const HeaderHorizontalBorder = styled(HorizontalBorder)`
  margin: ${margins.large} 0;
`;
