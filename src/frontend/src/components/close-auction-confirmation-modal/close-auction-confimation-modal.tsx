import React, { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as text from "../../assets/text";
import { path } from "../../assets/util";
import { resetCreateBid } from "../../store";
import { ButtonBase, HeaderHorizontalBorder, Heading, MainModalContainer, ModalContainer } from "../../view";
import { Box, CancelCrossIcon, ConfirmationText, HeadingContainer, PaymentContainer } from "./styles";

export const CloseAuctionConfirmationModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const closeModal = useCallback(
    (specPath?: string) => {
      if (!specPath) specPath = `${path.dashboard}`;

      dispatch(resetCreateBid());
      history.push(specPath);
    },
    [dispatch, history]
  );

  return (
    <ModalContainer>
      <PaymentContainer>
        <MainModalContainer>
          <HeadingContainer>
            <Heading>{text.congratulations}</Heading>
            <CancelCrossIcon onClick={() => closeModal()} />
          </HeadingContainer>
          <HeaderHorizontalBorder />
          <ConfirmationText>{text.closeAuctionConfirmation}</ConfirmationText>
          <Box>
            <ButtonBase onClick={() => closeModal(path.dashboard)}>{text.viewMoreAuctions}</ButtonBase>
          </Box>
        </MainModalContainer>
      </PaymentContainer>
    </ModalContainer>
  );
};
