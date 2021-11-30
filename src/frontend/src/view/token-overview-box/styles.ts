import styled from "styled-components";
import { fontWeight, margins } from "../../design-system";
import { Badge, RoundBox, SubHeading, ImageContainer } from "../atoms";

export const WalletContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: 1fr;
  grid-column-gap: ${margins.medium};
  grid-row-gap: ${margins.medium};
`;

export const NftContainer = styled(ImageContainer)`
  padding: ${margins.medium};
`;

export const IconContainer = styled.span`
  display: flex;
  margin: ${margins.medium};
`;

export const TokenOverviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  grid-template-rows: 1fr;
  grid-column-gap: ${margins.medium};
  grid-row-gap: ${margins.medium};
  margin-top: 50px;
`;

export const TokenDetailContainer = styled.div`
  ${SubHeading} {
    margin-bottom: ${margins.small};
    max-width: 700px;
  }
`;

export const Wrapper = styled(RoundBox)`
  padding: ${margins.medium};
  min-width: 400px;
  ${SubHeading} {
    font-weight: ${fontWeight.light};
  }
  ${Badge} {
    margin-right: ${margins.mini};
  }
`;

export const DropdownContainer = styled.div`
  justify-content: space-between;
  display: flex;
`;
