import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { BackWithLink, BaseRoute, TokenOverviewBox } from "../../view";
import { path } from "../../assets/util";
import { resetTokenInputs, useCreateTokenState } from "../../store";
import * as text from "../../assets/text";
import { color } from "../../design-system";
import { useCreateNft } from "../../service/nft";
import { SubmitButton } from "./styles";
import { GenericError } from "../generic-error";

export const NewNftPreview: FC = () => {
  const dispatch = useDispatch();
  const { preview } = useCreateTokenState();
  const [createNft, loading] = useCreateNft();
  const history = useHistory();

  const publishNft = async (): Promise<void> => {
    await createNft();
    dispatch(resetTokenInputs());
    history.push({
      pathname: `${path.mintNft}${path.confirmation}`,
      state: { nft: preview },
    });
  };

  if (!preview) return <GenericError errorMessage={text.pageNotFound} errorTitle={text.nftpreviewNotFound} returnRoute={path.wallet} />;

  return (
    <BaseRoute>
      <BackWithLink link={path.mintNft} />
      <TokenOverviewBox token={preview} />
      <SubmitButton disabled={loading} backgroundColor={color.sidebarColor} fontColor={color.white} onClick={publishNft}>
        {text.submit}
      </SubmitButton>
    </BaseRoute>
  );
};
