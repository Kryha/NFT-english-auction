import styled from "styled-components";
import { margins } from "../../design-system";
import { RoundBox } from "../../view";

export const WalletContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: 1fr;
  grid-column-gap: ${margins.medium};
  grid-row-gap: ${margins.medium};
`;
export const TotalValueContainer = styled(RoundBox)`
  margin-top: 50px;
`;
