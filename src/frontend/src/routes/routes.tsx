import React, { FC } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import {
  Dashboard,
  MyBids,
  NewAuction,
  Landing,
  AuctionDetail,
  BidConfirmationModal,
  ReviewBidModal,
  Wallet,
  WalletDetail,
  NewAuctionPreview,
  NftConfirmationModal,
  NewNftPreview,
  CreateNft,
  GenericError,
  BidDetail,
  ProtectedRoute,
  MyAuctions,
  ActivateAuctionModal,
} from "../components";
import { ErrorBoundaryFallback, MainConatiner } from "../view";
import { SideBar } from "./sidebar";
import { path } from "../assets";
import { CreditTopUpModal } from "../components/credit-topup-modal";
import { CloseAuctionConfirmationModal } from "../components/close-auction-confirmation-modal";
import { CloseAuctionModal } from "../components/close-auction-modal";

export const Routes: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const errorFallbackReset = (): void => {
    history.push("/");
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onError={errorFallbackReset}>
      <MainConatiner sidebarNav={<SideBar />} hideContainer={location.pathname === "/"}>
        <Switch>
          <Route exact path="/" component={Landing} />

          <Route path={`${path.dashboard}/:id`} component={AuctionDetail} />
          <Route path={path.dashboard} component={Dashboard} />

          <ProtectedRoute path={`${path.myBids}/:id`} component={BidDetail} />
          <ProtectedRoute path={path.myBids} component={MyBids} />

          <ProtectedRoute path={path.myAuctions} component={MyAuctions} />

          <ProtectedRoute path={`${path.newAuction}${path.preview}`} component={NewAuctionPreview} />
          <ProtectedRoute path={path.newAuction} component={NewAuction} />

          <ProtectedRoute path={`${path.wallet}/:id`} component={WalletDetail} />
          <ProtectedRoute path={`${path.wallet}`} component={Wallet} />

          <ProtectedRoute path={`${path.mintNft}${path.preview}`} component={NewNftPreview} />
          <ProtectedRoute path={path.mintNft} component={CreateNft} />
        </Switch>
        <Route exact path={`${path.dashboard}/:id${path.reviewBidModal}`} component={ReviewBidModal} />
        <Route exact path={`${path.dashboard}${path.confirmation}`} component={BidConfirmationModal} />
        <ProtectedRoute exact path={`${path.mintNft}${path.confirmation}`} component={NftConfirmationModal} />
        <ProtectedRoute exact path={`${path.myAuctions}${path.activate}`} component={ActivateAuctionModal} />
        <ProtectedRoute exact path={`${path.closeAuction}`} component={CloseAuctionModal} />
        <ProtectedRoute exact path={`${path.closeAuctionConfirmation}`} component={CloseAuctionConfirmationModal} />
        <ProtectedRoute exact path={`${path.topUp}`} component={CreditTopUpModal} />

        <ProtectedRoute path={`${path.error}`} component={GenericError} />
      </MainConatiner>
    </ErrorBoundary>
  );
};
