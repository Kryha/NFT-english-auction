import React, { useCallback, useEffect } from "react";
import { BaseRoute, HeaderHorizontalBorder, Heading, MainModalContainer, ModalContainer, ImageContainer } from "../../view";
import { path } from "../../assets/util";
import { useHistory, useLocation } from "react-router-dom";
import { CancelCrossIcon, HeadingContainer, ModalWrapper } from "./styles";
import * as text from "../../assets/text";
import { TokenObject } from "../../../../types";
import { NftDisplayImage } from "../../view/nft-display-image";
import { GenericError } from "../generic-error";

interface HistoryState {
  nft: TokenObject;
}

export const NftConfirmationModal = (): React.ReactElement => {
  const history = useHistory<HistoryState>();
  const locationData = useLocation<HistoryState>();
  const { nft } = locationData.state;

  const closeModal = useCallback((): void => {
    history.push(`${path.wallet}`);
  }, [history]);

  useEffect(() => {
    if (!locationData.state || !nft) {
      closeModal();
    }
  }, [closeModal, locationData.state, nft]);

  if (!nft) return <GenericError errorMessage={text.pageNotFound} errorTitle={text.nftNotFound} returnRoute={path.wallet} />;

  return (
    <BaseRoute>
      <ModalContainer>
        <ModalWrapper>
          <MainModalContainer>
            <HeadingContainer>
              <Heading>{text.successfulNftCreation(nft.title)}</Heading>
              <CancelCrossIcon onClick={(): void => closeModal()} />
            </HeadingContainer>
            <HeaderHorizontalBorder />
            <ImageContainer>
              <NftDisplayImage file={nft.file} />
            </ImageContainer>
          </MainModalContainer>
        </ModalWrapper>
      </ModalContainer>
    </BaseRoute>
  );
};
