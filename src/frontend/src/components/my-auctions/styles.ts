import styled from "styled-components";
import { margins } from "../../design-system";

export const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: ${margins.medium};
  margin-top: 50px;
`;

export const RouteHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
