import styled from "styled-components";
import { margins } from "../../design-system";
import { RoundBox } from "../atoms";

export const HeadingContainer = styled(RoundBox)`
  flex: 1;
  padding: ${margins.medium};
  opacity: 0.6;
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
`;
