import React from "react";
import { BaseRoute, ContentLoader, OverviewEmpty, Title, LabeledValue, WalletCard } from "../../view";
import * as text from "../../assets/text";
import { WalletContainer, TotalValueContainer } from "./styles";
import { path } from "../../assets/util";
import { useNFT } from "../../hooks/use-wallet";
import { useWalletValues } from "../../store";
import { TokenObject } from "../../../../types";

export const Wallet = (): React.ReactElement => {
  const [tokens, fetching] = useNFT();
  const [tokenValue] = useWalletValues();
  return (
    <BaseRoute>
      <Title>{text.wallet}</Title>
      <ContentLoader loading={fetching}>
        {!tokens.length ? (
          <OverviewEmpty title={text.mintFirstNFT} quote={text.createFirstNftQuote} buttonLabel={text.mintNft} path={path.mintNft} />
        ) : (
          <>
            <TotalValueContainer>
              <LabeledValue label={text.totalValue} value={tokenValue} largeContainer={true} />
            </TotalValueContainer>
            <WalletContainer>
              {tokens.map((item: TokenObject) => {
                return (
                  <WalletCard key={item.tokenId} link={`${path.wallet}/${item.tokenId}`} token={item} isOnlyChild={tokens.length === 1} />
                );
              })}
            </WalletContainer>
          </>
        )}
      </ContentLoader>
    </BaseRoute>
  );
};
