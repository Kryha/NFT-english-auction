import React from "react";
import { SidebarLinkContainer, NavigationSection } from "../view";
import { path } from "../assets/util";
import * as text from "../assets/text";
import { AuctionGavelIcon, CoinIcon, DashboardIcon, NotificationIcon, WalletIcon } from "../assets/icons";
import { useAuth } from "../hooks";

export const SideBar = (): React.ReactElement => {
  const auth = useAuth();
  return (
    <>
      <NavigationSection
        route={path.dashboard}
        isActive={(_match, location) => {
          return Boolean(location.pathname.startsWith(path.dashboard) || location.pathname === path.dashboard);
        }}
      >
        <SidebarLinkContainer icon={<DashboardIcon />} routeName={text.dashboard} />
      </NavigationSection>
      <NavigationSection
        route={path.myBids}
        isActive={(_match, location) => {
          return Boolean(location.pathname.startsWith(path.myBids) || location.pathname === path.myBids);
        }}
      >
        <SidebarLinkContainer icon={<NotificationIcon />} routeName={text.myBids} isAuthenticated={auth.isAuthenticated} />
      </NavigationSection>
      <NavigationSection
        route={path.myAuctions}
        isActive={(_match, location) => {
          return Boolean(location.pathname.startsWith(path.myAuctions) || location.pathname === path.myAuctions);
        }}
      >
        <SidebarLinkContainer icon={<AuctionGavelIcon />} routeName={text.myAuctions} isAuthenticated={auth.isAuthenticated} />
      </NavigationSection>
      <NavigationSection
        route={path.wallet}
        isActive={(_match, location) => {
          return Boolean(location.pathname.startsWith(path.wallet) || location.pathname === path.wallet);
        }}
      >
        <SidebarLinkContainer icon={<WalletIcon />} routeName={text.myWallet} isAuthenticated={auth.isAuthenticated} />
      </NavigationSection>
      <NavigationSection
        route={path.mintNft}
        isActive={(_match, location) => {
          return Boolean(location.pathname.startsWith(path.mintNft) || location.pathname === path.mintNft);
        }}
      >
        <SidebarLinkContainer icon={<CoinIcon />} routeName={text.mintNft} isAuthenticated={auth.isAuthenticated} />
      </NavigationSection>
    </>
  );
};
