import styled from "styled-components";
import { color, fontWeight, margins } from "../../design-system";
import { ButtonBase, TableText } from "../../view";

export const PaymentContainer = styled.div`
  max-width: 900px;
  background-color: ${color.white};
  border-radius: ${margins.mini};
  min-width: 600px;
`;

export const DarkDetail = styled(TableText)`
  font-weight: ${fontWeight.bold};
`;

export const ButtonContainer = styled(ButtonBase)`
  margin-left: ${margins.small};
`;
