import styled from "styled-components";
import { color } from "../../design-system";

interface SideBarProps {
  hideContainer: boolean;
}

export const SidebarContainer = styled.div<SideBarProps>`
  ${({ hideContainer }): string => {
    return hideContainer
      ? "display: none"
      : `
        background: linear-gradient(129.52deg, ${color.darkBlue} 0%, ${color.purple} 100%);
        max-width: 360px;
        min-width: 200px;
        flex: 25;
        transition: all 0.4s;
        opacity: 1;
        overflow-y: scroll;
        ::-webkit-scrollbar {
          display: none;
        }
      `;
  }};
`;

export const MainPageContainer = styled.div`
  background: ${color.offWhite};
  flex: 75;
  overflow-y: scroll;
  transition: all 0.4s;
`;

interface WrapProps {
  collapsedSidebar: boolean;
}

export const MainWrap = styled.div<WrapProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  ${({ collapsedSidebar }): string => {
    return collapsedSidebar
      ? `
      ${SidebarContainer} {
        flex: 0;
      }
      ${MainPageContainer} {
        flex: 100;
      }`
      : ``;
  }}
`;
