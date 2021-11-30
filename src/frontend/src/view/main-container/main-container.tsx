import React from "react";
import { SidebarBase } from "..";
import { useSidebarState } from "../../store";
import { MainWrap, SidebarContainer, MainPageContainer } from "./styles";

interface MainConatinerProps {
  sidebarNav: React.ReactElement;
  children: React.ReactNode;
  hideContainer: boolean;
}

export const MainConatiner = ({ sidebarNav, children, hideContainer }: MainConatinerProps): React.ReactElement => {
  const sidebarState = useSidebarState();
  return (
    <MainWrap collapsedSidebar={sidebarState}>
      <SidebarContainer hideContainer={hideContainer}>
        <SidebarBase navigation={sidebarNav} />
      </SidebarContainer>
      <MainPageContainer>{children}</MainPageContainer>
    </MainWrap>
  );
};
