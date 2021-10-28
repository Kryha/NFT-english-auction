import React from "react";
import { NavLink, match } from "react-router-dom";
import { Location } from "history";
import { SidebarNavigationContainer } from "./styles";

interface NavigationSectionProps {
  route: string;
  isActive?: (a: match | null, b: Location) => boolean;
  children?: React.ReactNode;
}

export const NavigationSection = ({ route, isActive, children }: NavigationSectionProps): React.ReactElement => {
  return (
    <SidebarNavigationContainer>
      <NavLink className={"navigation-zone"} exact={true} activeClassName="active" to={route} isActive={isActive}>
        {children}
      </NavLink>
    </SidebarNavigationContainer>
  );
};
