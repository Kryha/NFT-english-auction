import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AuctionDetailContainer, BaseRoute, ButtonBase } from "../../view";
import { AuctionContainer, SubmitButton } from "./styles";
import { color } from "../../design-system";
import { path } from "../../assets/util";
import * as text from "../../assets/text";
import { resetCreateAuction, useCreateAuctionState } from "../../store";
import { useCreateAuction } from "../../service";

export const NewAuctionPreview: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { preview } = useCreateAuctionState();
  const [createAuction, loading] = useCreateAuction();

  const publishAuction = async (): Promise<void> => {
    await createAuction();
    dispatch(resetCreateAuction());
    history.push(path.myAuctions);
  };

  const goBack = (): void => {
    history.goBack();
  };

  return (
    <BaseRoute>
      <AuctionContainer>
        <AuctionDetailContainer auction={preview} />
        <ButtonBase customColor={color.black} onClick={goBack}>
          {text.back}
        </ButtonBase>
        <SubmitButton disabled={loading} customColor={color.green} onClick={publishAuction}>
          {text.submit}
        </SubmitButton>
      </AuctionContainer>
    </BaseRoute>
  );
};
