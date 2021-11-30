import styled from "styled-components";

import { ButtonBase } from "../atoms";
import { margins } from "../../design-system";
import { BidInput } from "../formik-fields/styles";

export const FormButton = styled(ButtonBase)`
  flex: 1;
  display: inline-flex;
  margin-top: ${margins.small};
  min-width: 163px;
`;

export const FormRow = styled.div`
  display: table;
  ${BidInput} {
    width: 95%;
  }
`;

export const InputContainer = styled.div`
  display: table-cell;
  width: 100%;
`;
