import styled from "styled-components";
import { SidebarHeading } from "../atoms/texts";
import { DoubleBackIcon } from "../../assets";
import { color, margins } from "../../design-system";

export const LogoContainer = styled.div`
  padding: ${margins.medium} ${margins.medium} 0px ${margins.medium};
  max-width: 260px;
`;

export const NavigationContainer = styled.div`
  margin-top: ${margins.medium};
`;

interface WrapProps {
  collapsedSidebar: boolean;
}

export const Header = styled(SidebarHeading)`
  color: ${color.offWhite};
  margin-bottom: 55px;
`;

export const ButtonContainer = styled.span`
  align-self: flex-start;
  margin-top: auto;
  margin-bottom: ${margins.medium};
  margin-left: ${margins.medium};
`;

export const CollapsedSidebarIcon = styled(DoubleBackIcon)`
  width: 50px;
  height: 50px;
  align-self: flex-end;
  margin-top: auto;
  margin-bottom: ${margins.medium};
  margin-right: ${margins.medium};
  fill: ${color.white};
  cursor: pointer;
`;

export const SidebarBaseWrapper = styled.div<WrapProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  padding-right: ${margins.small};
  overflow-y: scroll;
  ${({ collapsedSidebar }): string => {
    return collapsedSidebar
      ? `

      padding-right: 0;

      ${LogoContainer} {
        padding: 55px ${margins.mini};
      }

      ${CollapsedSidebarIcon} {
        transform: rotate(180deg);
      }

      ${Header}{
        padding-left: ${margins.medium};
      }

      ${ButtonContainer}{
        margin-left: ${margins.small};
      }
      `
      : ``;
  }}
`;
