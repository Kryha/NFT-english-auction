import React from "react";
import { SubHeading } from "../";
import { IconContainer, SidebarContainer } from "./styles";

interface SidebarLinkContainerProps {
  icon: React.ReactNode;
  routeName: string;
}

export const SidebarLinkContainer = ({ icon, routeName }: SidebarLinkContainerProps): React.ReactElement => {
  return (
    <SidebarContainer>
      <IconContainer>{icon}</IconContainer>
      <SubHeading>{routeName}</SubHeading>
    </SidebarContainer>
  );
};
