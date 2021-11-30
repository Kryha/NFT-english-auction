import styled from "styled-components";
import { margins } from "../../design-system";
import { SubHeading } from "../atoms";

interface SideBarProps {
  collapsedSidebar: boolean;
  isAuthenticated: boolean;
}

export const SidebarBox = styled.div`
  margin-left: ${margins.medium};
`;

export const SidebarContainer = styled.div<SideBarProps>`
  display: flex;
  align-items: center;

  ${({ collapsedSidebar }): string => {
    return collapsedSidebar
      ? `
      padding: ${margins.small} ${margins.small} ${margins.small} ${margins.medium};
      ${SubHeading} {
        display: none;
      }`
      : `
      padding: ${margins.small} ${margins.small} ${margins.small} 0px;
      `;
  }};
  ${({ isAuthenticated }): string => {
    return isAuthenticated ? "" : `display: none;`;
  }};
`;

export const IconContainer = styled(SidebarBox)`
  display: grid;
  place-content: center;
  margin-right: ${margins.small};
  width: 50px;
  height: 50px;
`;
