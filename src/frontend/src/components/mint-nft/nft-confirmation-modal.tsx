import React, { useCallback } from "react";

import { BaseRoute, HeaderHorizontalBorder, Heading, MainModalContainer, ModalContainer, ImageContainer } from "../../view";
import { path } from "../../assets/util";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { CancelCrossIcon, HeadingContainer, ModalWrapper } from "./styles";
import * as text from "../../assets/text";
import { TokenObject } from "../../../../types";
import { NftDisplayImage } from "../../view/nft-display-image";

interface HistoryState {
  nft: TokenObject;
}

export const NftConfirmationModal = (): React.ReactElement => {
  const history = useHistory<HistoryState>();
  const locationData = useLocation<HistoryState>();
  const { nft } = locationData.state;

  const closeModal = useCallback((): void => {
    history.push(path.wallet);
  }, [history]);

  if (!nft) return <Redirect to={path.wallet} />;

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
