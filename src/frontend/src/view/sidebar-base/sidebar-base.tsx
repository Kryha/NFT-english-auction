import React, { FC, useCallback, useEffect } from "react";

import { SidebarBaseWrapper, LogoContainer, Header, ButtonContainer, CollapsedSidebarIcon } from "./styles";
import * as text from "../../assets";
import { useCompactMode } from "../../hooks";
import { useDispatch } from "react-redux";
import { updateSidebar, useSidebarState } from "../../store";
import { AuthButton } from "../auth-button";

interface SidebarBaseProps {
  navigation: React.ReactElement;
}

export const SidebarBase: FC<SidebarBaseProps> = ({ navigation }) => {
  const sidebarState = useSidebarState();
  const isCompact = useCompactMode();
  const dispatch = useDispatch();

  const changeSidebarState = useCallback(
    (newSidebarState: boolean): void => {
      dispatch(updateSidebar(newSidebarState));
    },
    [dispatch]
  );

  useEffect(() => {
    changeSidebarState(isCompact);
  }, [changeSidebarState, isCompact]);

  return (
    <SidebarBaseWrapper collapsedSidebar={sidebarState}>
      <LogoContainer>
        <Header>{text.veiling}</Header>
      </LogoContainer>
      {navigation}
      <ButtonContainer>
        <AuthButton />
      </ButtonContainer>
      <CollapsedSidebarIcon onClick={(): void => changeSidebarState(!sidebarState)} />
    </SidebarBaseWrapper>
  );
};
