import styled from "styled-components";
import { RoundBox } from "../atoms";
import { margins } from "../../design-system";

export const BidOverviewBoxContainer = styled(RoundBox)`
  flex: 1;
  padding: ${margins.medium};
  display: flex;
  margin-top: ${margins.small};
`;
