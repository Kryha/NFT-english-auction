import React from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard, MyBids, NewAuction, Landing } from "../components";
import { MainConatiner } from "../view";
import { SideBar } from "./sidebar";
import { path } from "../assets";

export const Routes = (): React.ReactElement => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <MainConatiner sidebarNav={<SideBar />}>
        <Route exact path={path.dashboard} component={Dashboard} />
        <Route exact path={path.myBids} component={MyBids} />
        <Route exact path={path.newAuction} component={NewAuction} />
      </MainConatiner>
    </Switch>
  );
};
