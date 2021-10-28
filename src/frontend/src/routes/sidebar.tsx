import React from "react";
import { SidebarLinkContainer, NavigationSection } from "../view";
import { Dashboard, Gavel, Notifications } from "@material-ui/icons";
import { path } from "../assets/util";
import * as text from "../assets/text";

export const SideBar = (): React.ReactElement => {
  return (
    <>
      <NavigationSection
        route={path.dashboard}
        isActive={(_match, location) => {
          return Boolean(location.pathname.startsWith(path.dashboard) || location.pathname === path.dashboard);
        }}
      >
        <SidebarLinkContainer icon={<Dashboard />} routeName={text.dashboard} />
      </NavigationSection>
      <NavigationSection
        route={path.myBids}
        isActive={(_match, location) => {
          return Boolean(location.pathname.startsWith(path.myBids) || location.pathname === path.myBids);
        }}
      >
        <SidebarLinkContainer icon={<Notifications />} routeName={text.myBids} />
      </NavigationSection>
      <NavigationSection
        route={path.newAuction}
        isActive={(_match, location) => {
          return Boolean(location.pathname.startsWith(path.newAuction) || location.pathname === path.newAuction);
        }}
      >
        <SidebarLinkContainer icon={<Gavel />} routeName={text.newAuction} />
      </NavigationSection>
    </>
  );
};
