import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import * as text from "../../assets/text";
import { path } from "../../assets/util";
import { useCloseAuction } from "../../service";
import { resetCreateBid } from "../../store";
import { ButtonBase, HeaderHorizontalBorder, Heading, MainModalContainer, ModalContainer } from "../../view";
import { Box, CancelCrossIcon, ConfirmationText, HeadingContainer, PaymentContainer } from "./styles";

interface LocationState {
  auctionId?: number;
}

export const CloseAuctionModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const closeAuction = useCloseAuction();
  const location = useLocation<LocationState>();
  const { auctionId } = location.state;

  if (!auctionId && auctionId !== 0) return <Redirect to={path.dashboard} />;

  const close = async (specPath?: string) => {
    if (!specPath) specPath = `${path.dashboard}/${auctionId}`;
    await closeAuction(auctionId);
    dispatch(resetCreateBid());
    history.push(specPath);
  };

  return (
    <ModalContainer>
      <PaymentContainer>
        <MainModalContainer>
          <HeadingContainer>
            <Heading>{text.closeAuction}</Heading>
            <CancelCrossIcon onClick={() => history.push(path.dashboard)} />
          </HeadingContainer>

          <HeaderHorizontalBorder />
          <ConfirmationText>{text.closeAuctionWarning}</ConfirmationText>

          <Box>
            <ButtonBase onClick={() => close(path.closeAuctionConfirmation)}>{text.confirm}</ButtonBase>
          </Box>
        </MainModalContainer>
      </PaymentContainer>
    </ModalContainer>
  );
};
