import React, { FC } from "react";

import { Heading, HeaderHorizontalBorder, GeneralText, TableRow, Badge, SubHeading } from "../atoms";
import * as text from "../../assets/text";
import { NftContainer, Wrapper, TokenDetailContainer, TokenOverviewContainer } from "./styles";
import { TokenObject } from "../../../../types";
import { color } from "../../design-system";
import { NftDisplayImage } from "../nft-display-image";
import { DropdownMenu } from "../token-dropdown";

interface TokenOverviewBoxProps {
  token: TokenObject;
}

export const TokenOverviewBox: FC<TokenOverviewBoxProps> = ({ token }) => {
  return (
    <TokenOverviewContainer>
      <NftContainer>
        <NftDisplayImage file={token.file} />
      </NftContainer>
      <TokenDetailContainer>
        <Heading>{token.title}</Heading>
        <SubHeading>{text.ownedBy(token.owner)}</SubHeading>
        <Wrapper>
          <SubHeading>{text.description}</SubHeading>
          <GeneralText>{token.description}</GeneralText>
          <HeaderHorizontalBorder />
          <SubHeading>{text.category}</SubHeading>
          <Badge customColor={color.darkBlue}>{token.category}</Badge>
          <HeaderHorizontalBorder />
          <DropdownMenu name={text.details} data={token}>
            <TableRow>
              <GeneralText>{text.tokenId}</GeneralText>
              <GeneralText>{token.tokenId}</GeneralText>
            </TableRow>
            <TableRow>
              <GeneralText>{text.tokenStandard}</GeneralText>
              <GeneralText>{text.erc721}</GeneralText>
            </TableRow>
          </DropdownMenu>
        </Wrapper>
      </TokenDetailContainer>
    </TokenOverviewContainer>
  );
};
