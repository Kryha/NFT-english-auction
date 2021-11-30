import React, { FC, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import * as text from "../../assets/text";
import { path } from "../../assets/util";
import { color } from "../../design-system";
import { useCreditTopUp } from "../../service";
import { ButtonBase, Heading, MainModalContainer, ModalContainer, HeaderHorizontalBorder } from "../../view";
import { Box, ButtonContainer, CancelCrossIcon, HeadingContainer, PaymentContainer, TokenInput, TokenText } from "./styles";

export const CreditTopUpModal: FC = () => {
  const history = useHistory();
  const topUp = useCreditTopUp();
  const [amount, setAmount] = useState<number>(100);
  const closeModal = useCallback(
    (specPath?: string) => {
      if (!specPath) specPath = path.dashboard;
      history.push(specPath);
    },
    [history]
  );

  const submit = async () => {
    if (amount === 0) return;
    await topUp(amount);
    closeModal(path.dashboard);
  };

  return (
    <ModalContainer>
      <PaymentContainer>
        <MainModalContainer>
          <HeadingContainer>
            <Heading>{text.creditTopUp}</Heading>
            <CancelCrossIcon onClick={() => closeModal()} />
          </HeadingContainer>
          <HeaderHorizontalBorder />
          <TokenText>{text.topUpModalInfo}</TokenText>
          <TokenInput type="number" onChange={(e) => setAmount(parseInt(e.target.value))} value={amount} />
          <Box>
            <ButtonBase onClick={() => closeModal(path.dashboard)}>{text.cancel}</ButtonBase>
            <ButtonContainer customColor={color.darkBlue} onClick={submit}>
              {text.topUp}
            </ButtonContainer>
          </Box>
        </MainModalContainer>
      </PaymentContainer>
    </ModalContainer>
  );
};
