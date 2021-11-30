import React from "react";
import { SubHeading } from "../atoms";
import { useSidebarState } from "../../store";
import { IconContainer, SidebarContainer } from "./styles";

interface SidebarLinkContainerProps {
  icon: React.ReactNode;
  routeName: string;
  isAuthenticated?: boolean;
}

export const SidebarLinkContainer = ({ icon, routeName, isAuthenticated = true }: SidebarLinkContainerProps): React.ReactElement => {
  const sidebarState = useSidebarState();
  return (
    <SidebarContainer collapsedSidebar={sidebarState} isAuthenticated={isAuthenticated}>
      <IconContainer>{icon}</IconContainer>
      <SubHeading>{routeName}</SubHeading>
    </SidebarContainer>
  );
};
