import React, { FC } from "react";

import * as text from "../../assets";
import { AuctionObject, AuctionStatus, File } from "../../../../types";
import { ButtonEnd, CardDetailText, CardHeadingContainer, Container, HeaderContainerText, IconContainer, SectionBadge } from "./style";
import { Badge, HeaderHorizontalBorder, Label, NftDisplayImage } from "../../view";
import { color, statusColor } from "../../design-system";
import { defaultDateFormat } from "../../utils";
import { useHistory } from "react-router";
import { path } from "../../assets";
import { useAuth } from "../../hooks";

interface AuctionCardProps {
  data: AuctionObject;
  highestBid: number;
  link: string;
  file?: File;
}

export const AuctionCard: FC<AuctionCardProps> = ({ data, link, file, highestBid }) => {
  const { name, status, owner, startPrice, dateCreated, deadline } = data;
  const history = useHistory();
  const { principalId } = useAuth();
  const perStatusDisplay = (): React.ReactElement => {
    if (status === AuctionStatus.Pending || status === AuctionStatus.Active) {
      return <CardDetailText>{`${text.dateStatus[status]} ${defaultDateFormat(dateCreated)}`}</CardDetailText>;
    } else {
      return <CardDetailText>{`${text.dateStatus[status]} ${defaultDateFormat(deadline)}`}</CardDetailText>;
    }
  };
  const isClosed = status === AuctionStatus.Closed;
  const isActive = status === AuctionStatus.Active;

  const isOwner = principalId === owner;
  const reachedClosingConditions: boolean = isOwner && (Date.now() > deadline || data.buyNowPrice <= Number(highestBid));

  let buttonText = status === AuctionStatus.Pending ? text.activate : text.bidNow;
  if (reachedClosingConditions) buttonText = text.closeAuction;
  const showButton = (isOwner && reachedClosingConditions && isActive) || (!isClosed && !isOwner) || (isActive && !isOwner);
  const redirect = () => {
    if (reachedClosingConditions && !isClosed) {
      history.push({
        pathname: path.closeAuction,
        state: {
          auctionId: data.id,
        },
      });
    } else {
      history.push({
        pathname: link,
        state: {
          auction: data,
        },
      });
    }
  };

  return (
    <Container onClick={redirect}>
      <CardHeadingContainer>
        <HeaderContainerText>{name}</HeaderContainerText>
        <SectionBadge>
          <Badge customColor={statusColor[status]}>{status}</Badge>
        </SectionBadge>
      </CardHeadingContainer>
      <IconContainer>
        <NftDisplayImage isCard file={file} />
      </IconContainer>
      <HeaderHorizontalBorder />
      <CardDetailText>{text.ownerLabel(owner)}</CardDetailText>
      <CardDetailText>{text.startingBid(startPrice)}</CardDetailText>
      {perStatusDisplay()}
      <HeaderHorizontalBorder />
      {showButton && (<ButtonEnd>
        <Label color={color.blue}>{buttonText}</Label>
        </ButtonEnd>
      )}
    </Container>
  );
};
