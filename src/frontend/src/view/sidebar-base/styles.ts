import styled from "styled-components";
import { SidebarHeading, TableText } from "../";
import { color, margins } from "../../design-system";

export const LogoContainer = styled.div`
  padding: ${margins.medium};
  max-width: 260px;
`;

export const NavigationContainer = styled.div`
  margin-top: ${margins.medium};
`;

export const SidebarBaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  padding-right: ${margins.small};
`;

export const Header = styled(SidebarHeading)`
  color: ${color.offWhite};
  margin-bottom: 55px;
  text-transform: uppercase;
`;

export const SubHeader = styled(TableText)`
  color: ${color.offWhite};
`;
