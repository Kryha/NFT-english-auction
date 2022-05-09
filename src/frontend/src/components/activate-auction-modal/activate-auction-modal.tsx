import React, { FC, useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";

import { AuctionObject } from "../../../../types";
import * as text from "../../assets/text";
import { path } from "../../assets/util";
import { color } from "../../design-system";
import { useActivateAuction } from "../../service";
import { useTransferNft } from "../../service/nft";
import { ButtonBase, Heading, LabeledData, MainModalContainer, ModalContainer, HeaderHorizontalBorder } from "../../view";
import {
  Box,
  ButtonContainer,
  CancelCrossIcon,
  ConfirmationText,
  HeadingContainer,
  PaymentContainer,
  TokenInput,
  TokenText,
} from "./styles";

type LocationState = {
  auction?: AuctionObject;
};

export const ActivateAuctionModal: FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { auction } = location.state;
  const [nftId, setNftId] = useState("");
  const activate = useActivateAuction();
  const transfer = useTransferNft();

  if (!auction) return <Redirect to={path.myAuctions} />;

  const closeModal = (specPath?: string) => {
    if (!specPath) specPath = path.myAuctions;
    history.push(specPath);
  };

  const submit = async () => {
    if (!nftId) return;
    await transfer(nftId);
    await activate({ auctionId: auction.id, nftId: nftId });
    closeModal(path.myAuctions);
  };

  return (
    <ModalContainer>
      <PaymentContainer>
        <MainModalContainer>
          <HeadingContainer>
            <Heading>{text.activateNft}</Heading>
            <CancelCrossIcon onClick={() => closeModal()} />
          </HeadingContainer>

          <HeaderHorizontalBorder />

          <ConfirmationText>{text.activateYourNft(auction.name)}</ConfirmationText>
          <TokenText>{text.activateNftWarning(auction.name)}</TokenText>
          <LabeledData label={text.enterTokenId} />
          <TokenInput type="text" onChange={(e) => setNftId(e.target.value)} value={nftId} />

          <Box>
            <ButtonBase onClick={() => closeModal(path.dashboard)}>{text.cancel}</ButtonBase>
            <ButtonContainer customColor={color.darkBlue} onClick={submit}>
              {text.activateAuction}
            </ButtonContainer>
          </Box>
        </MainModalContainer>
      </PaymentContainer>
    </ModalContainer>
  );
};
