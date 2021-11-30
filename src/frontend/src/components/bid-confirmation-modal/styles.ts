import styled from "styled-components";
import { CancelIcon } from "../../assets/icons";
import { color, fontWeight, margins } from "../../design-system";
import { ButtonBase, TableText } from "../../view";

export const ConfirmationText = styled(TableText)`
  font-weight: ${fontWeight.bold};
  color: ${color.darkBlue};
  margin-top: 50px;
  margin-bottom: ${margins.medium};
`;

export const ButtonContainer = styled(ButtonBase)`
  margin-left: ${margins.small};
`;

export const Box = styled.div`
  display: flex;
  margin-top: 70px;
`;

export const PaymentContainer = styled.div`
  max-width: 900px;
  background-color: ${color.white};
  border-radius: ${margins.mini};
  min-width: 600px;
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CancelCrossIcon = styled(CancelIcon)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
