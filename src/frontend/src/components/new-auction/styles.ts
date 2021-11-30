import styled from "styled-components";
import { margins } from "../../design-system";
import { ButtonBase, RoundBox } from "../../view";
import { BidInput } from "../../view/formik-fields/styles";

export const AuctionContainer = styled(RoundBox)`
  padding: 0px ${margins.medium} ${margins.medium} ${margins.medium};
  margin-top: 50px;
  ${BidInput} {
    margin-top: ${margins.mini};
  }
`;

export const SubmitButton = styled(ButtonBase)`
  flex: 1;
  display: inline-flex;
  margin-top: ${margins.medium};
  margin-left: ${margins.small};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: ${margins.medium};
  grid-row-gap: 0px;
  ${BidInput} {
    width: 100%;
    bottom: 0;
  }
`;

export const NextButton = styled(ButtonBase)`
  margin-top: ${margins.medium};
`;
