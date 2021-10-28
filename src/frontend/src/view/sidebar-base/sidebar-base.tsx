import React from "react";
import { SidebarBaseWrapper, LogoContainer, NavigationContainer, Header, SubHeader } from "./styles";
import * as text from "../../assets";

interface SidebarBaseProps {
  navigation: React.ReactElement;
}

export const SidebarBase = ({ navigation }: SidebarBaseProps): React.ReactElement => {
  return (
    <SidebarBaseWrapper>
      <LogoContainer>
        <Header>{text.veiling}</Header>
        <SubHeader>{text.owner}</SubHeader>
      </LogoContainer>
      <NavigationContainer>{navigation}</NavigationContainer>
    </SidebarBaseWrapper>
  );
};
