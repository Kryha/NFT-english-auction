import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import * as text from "../../assets/text";
import { path } from "../../assets/util";
import { useCloseAuction } from "../../service";
import { resetCreateBid } from "../../store";
import { ButtonBase, HeaderHorizontalBorder, Heading, MainModalContainer, ModalContainer } from "../../view";
import { Box, CancelCrossIcon, ConfirmationText, HeadingContainer, PaymentContainer } from "./styles";

export const CloseAuctionModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const closeAuction = useCloseAuction();
  const location = useLocation<{ auctionId: number }>();
  const auctionId = location.state.auctionId;

  const close = useCallback(
    async (specPath?: string) => {
      if (!specPath) specPath = `${path.dashboard}/${auctionId}`;
      await closeAuction(auctionId);
      dispatch(resetCreateBid());
      history.push(specPath);
    },
    [auctionId, closeAuction, dispatch, history]
  );

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
