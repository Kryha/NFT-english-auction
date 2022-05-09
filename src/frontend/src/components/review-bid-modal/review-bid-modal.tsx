import React, { FC } from "react";
import { Redirect, useHistory, useRouteMatch } from "react-router-dom";

import * as text from "../../assets/text";
import { path } from "../../assets/util";
import { color } from "../../design-system";
import { useCreateBid } from "../../service";
import { useCreateBidState } from "../../store";
import { dollarsToToken } from "../../utils";
import {
  ButtonBase,
  HeaderHorizontalBorder,
  Heading,
  MainModalContainer,
  ModalContainer,
  SubHeading,
  TableRow,
  TableText,
} from "../../view";
import { ButtonContainer, DarkDetail, PaymentContainer } from "./styles";

interface Params {
  id: string;
}

export const ReviewBidModal: FC = () => {
  const history = useHistory();
  const matchParams = useRouteMatch<Params>().params;
  const { preview, formData } = useCreateBidState();
  const [createBid, loading] = useCreateBid();

  const closeModal = (): void => {
    history.push(`${path.dashboard}/${matchParams.id}`);
  };

  if (!formData.auctionName) return <Redirect to={`${path.dashboard}/${matchParams.id}`} />;

  // TODO: Change how we calculate the token value
  const tokenValue = dollarsToToken(preview.amount);

  return (
    <ModalContainer>
      <PaymentContainer>
        <MainModalContainer>
          <Heading>{text.confirmYourBid}</Heading>
          <HeaderHorizontalBorder />
          <SubHeading>{text.summary}</SubHeading>
          <TableText>{text.lotLabel(preview.auctionId)}</TableText>
          <TableText>{formData.auctionName}</TableText>
          <TableRow>
            <TableText>{text.yourBid}</TableText>
            <DarkDetail>{text.monetaryValue(preview.amount)}</DarkDetail>
          </TableRow>
          <TableRow>
            <TableText>{text.value}</TableText>
            <DarkDetail>{tokenValue}</DarkDetail>
          </TableRow>
          <HeaderHorizontalBorder />
          <ButtonBase customColor={color.orange} disabled={loading} onClick={() => closeModal()}>
            {text.cancel}
          </ButtonBase>
          <ButtonContainer customColor={color.green} disabled={loading} onClick={() => createBid()}>
            {text.confirmBid}
          </ButtonContainer>
        </MainModalContainer>
      </PaymentContainer>
    </ModalContainer>
  );
};
