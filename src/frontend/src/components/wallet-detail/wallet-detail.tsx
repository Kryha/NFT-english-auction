import React, { FC } from "react";

import { BaseRoute, BackWithLink, TokenOverviewBox } from "../../view";
import { path } from "../../assets/util";
import { useNFTWallet } from "../../store";
import { useRouteMatch } from "react-router-dom";
import { GenericError } from "../generic-error";
import * as text from "../../assets/text";

interface WalletDetailId {
  id: string;
}

export const WalletDetail: FC = () => {
  const nft = useNFTWallet();
  const matchParams = useRouteMatch<WalletDetailId>().params;
  const token = nft.tokens.find((token) => token.tokenId === Number(matchParams.id));

  if (!token) return <GenericError errorTitle={text.noTokenFound(matchParams.id)} returnRoute={path.wallet} />;

  return (
    <BaseRoute>
      <BackWithLink link={path.wallet} />
      <TokenOverviewBox token={token} />
    </BaseRoute>
  );
};
