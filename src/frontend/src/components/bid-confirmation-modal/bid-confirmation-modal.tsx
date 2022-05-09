import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import * as text from "../../assets/text";
import { path } from "../../assets/util";
import { color } from "../../design-system";
import { resetCreateBid, useCreateBidState } from "../../store";
import { ButtonBase, HeaderHorizontalBorder, Heading, MainModalContainer, ModalContainer, TableText } from "../../view";
import { Box, ButtonContainer, CancelCrossIcon, ConfirmationText, HeadingContainer, PaymentContainer } from "./styles";

export const BidConfirmationModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { formData } = useCreateBidState();

  const { auctionName, auctionId } = formData;

  const closeModal = (specPath?: string) => {
    if (!specPath) specPath = `${path.dashboard}/${auctionId}`;

    dispatch(resetCreateBid());
    history.push(specPath);
  };

  if (!auctionName) return <Redirect to={`${path.dashboard}/${auctionId}`} />;

  return (
    <ModalContainer>
      <PaymentContainer>
        <MainModalContainer>
          <HeadingContainer>
            <Heading>{text.congratulations}</Heading>
            <CancelCrossIcon onClick={() => closeModal()} />
          </HeadingContainer>

          <HeaderHorizontalBorder />
          <ConfirmationText>{text.successfulBid(auctionName)}</ConfirmationText>
          <TableText>{text.confirmationSummary}</TableText>

          <Box>
            <ButtonBase onClick={() => closeModal(path.dashboard)}>{text.viewMoreAuctions}</ButtonBase>
            <ButtonContainer customColor={color.darkBlue} onClick={() => closeModal(path.myBids)}>
              {text.openYourBidStatus}
            </ButtonContainer>
          </Box>
        </MainModalContainer>
      </PaymentContainer>
    </ModalContainer>
  );
};
