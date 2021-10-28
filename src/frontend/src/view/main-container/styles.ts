import styled from "styled-components";
import { color } from "../../design-system";

export const SidebarContainer = styled.div`
  background: linear-gradient(129.52deg, ${color.darkBlue} 0%, ${color.purple} 100%);
  max-width: 360px;
  min-width: 90px;
  flex: 25;
  transition: all 0.4s;
  opacity: 1;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MainPageContainer = styled.div`
  background: ${color.offWhite};
  flex: 75;
  overflow-y: scroll;
  transition: all 0.4s;
`;

export const MainWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;
