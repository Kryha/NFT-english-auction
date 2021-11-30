import React from "react";
import * as text from "../../assets";
import { TokenObject } from "../../../../types";
import { CardHeadingContainer, Container, HeaderContainerText, IconContainer } from "./styles";
import { color } from "../../design-system";
import { ContainedButton, LinkContainer } from "../atoms";
import { NftDisplayImage } from "../nft-display-image";

interface WalletCardProps {
  token: TokenObject;
  link: string;
  isOnlyChild?: boolean;
}

export const WalletCard = ({ token, link, isOnlyChild }: WalletCardProps): React.ReactElement => {
  return (
    <LinkContainer to={link}>
      <Container isOnlyChild={isOnlyChild}>
        <IconContainer>
          <NftDisplayImage file={token.file} isCard={true} />
        </IconContainer>
        <HeaderContainerText>{token.title}</HeaderContainerText>
        <CardHeadingContainer>
          <ContainedButton backgroundColor={color.sidebarColor} fontColor={color.white}>
            {text.view}
          </ContainedButton>
        </CardHeadingContainer>
      </Container>
    </LinkContainer>
  );
};
