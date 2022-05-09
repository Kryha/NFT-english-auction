import React, { FC } from "react";
import { NavLink, match } from "react-router-dom";
import { Location } from "history";

import { SidebarNavigationContainer } from "./styles";

interface NavigationSectionProps {
  route: string;
  isActive?: (a: match | null, b: Location) => boolean;
}

export const NavigationSection: FC<NavigationSectionProps> = ({ route, isActive, children }) => {
  return (
    <SidebarNavigationContainer>
      <NavLink className="navigation-zone" exact activeClassName="active" to={route} isActive={isActive}>
        {children}
      </NavLink>
    </SidebarNavigationContainer>
  );
};
