import styled from "styled-components";
import { color, margins } from "../../design-system";

export const SidebarBox = styled.div`
  margin-left: ${margins.medium};
`;

export const SidebarNavigationContainer = styled.div`
  & .navigation-zone {
    width: 100%;
    display: flex;
    color: ${color.lightGrey};
    text-decoration: none;
  }
  & .navigation-zone path {
    stroke: ${color.white};
    fill: none;
  }
  & .navigation-zone.active ${SidebarBox} {
    background-color: none;
    width: 100%;
  }
  & .navigation-zone.active {
    background-color: none;
    color: ${color.white};
  }
  & .active path {
    fill: ${color.white};
  }
`;
