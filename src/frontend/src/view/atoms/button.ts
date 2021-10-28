import styled from "styled-components";
import { color, fontSize, fontWeight, margins } from "../../design-system";

interface ButtonProps {
  disabled?: boolean;
  customColor?: string;
}

export const ButtonBase = styled.button<ButtonProps>`
  text-transform: uppercase;
  display: inline-block;
  transition: all 0.4s ease 0s;
  background-color: transparent;
  padding: ${margins.small} ${margins.large};
  font-size: ${fontSize.subtitle};
  cursor: pointer;
  color: ${color.black};
  border: 2px solid ${color.black};
  border-radius: ${margins.mini};

  ${({ customColor }): string => {
    return customColor
      ? `
        color: ${customColor};
        border: 2px solid ${customColor};`
      : "";
  }};

  ${({ disabled }): string => {
    return disabled
      ? `
        && {
          cursor: default;
          opacity: 0.4
        }
      `
      : "";
  }};
`;

interface SidebarButtonProps {
  active?: boolean;
}

export const SidebarButton = styled(ButtonBase)<SidebarButtonProps>`
  background-color: linear-gradient(129.52deg, ${color.darkBlue} 0%, ${color.purple} 100%);
  font-weight: ${fontWeight.bold};
  display: grid;
  place-items: center;
  min-width: 90px;
  min-height: 50px;
  padding: 0 ${margins.small};
  color: ${color.offWhite};
  border: none;

  ${({ active }): string => {
    return active
      ? `
        background-color: none;
        color: ${color.white};

        & svg {
          fill: ${color.white};
        }
      `
      : "";
  }};
`;
