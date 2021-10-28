import React from "react";
import { SidebarBase } from "..";
import { MainWrap, SidebarContainer, MainPageContainer } from "./styles";

interface MainConatinerProps {
  sidebarNav: React.ReactElement;
  children: React.ReactNode;
}

export const MainConatiner = ({ sidebarNav, children }: MainConatinerProps): React.ReactElement => {
  return (
    <MainWrap>
      <SidebarContainer>
        <SidebarBase navigation={sidebarNav} />
      </SidebarContainer>
      <MainPageContainer>{children}</MainPageContainer>
    </MainWrap>
  );
};
