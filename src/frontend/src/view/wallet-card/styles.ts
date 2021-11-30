import styled from "styled-components";
import { RoundBox, CardHeading } from "../atoms";
import { color, margins } from "../../design-system";

export const CardHeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${margins.medium};
  margin-top: ${margins.medium};
`;

interface WalletProps {
  isOnlyChild?: boolean;
}

export const Container = styled(RoundBox)<WalletProps>`
  padding: ${margins.medium};
  height: 500px;
  color: ${color.black};
  cursor: pointer;
  margin-top: ${margins.large};
  ${({ isOnlyChild }): string => {
    return isOnlyChild ? `max-width: 500px;` : "";
  }};
`;

export const IconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const HeaderContainerText = styled(CardHeading)`
  margin-top: ${margins.mini};
`;
