import styled from "styled-components";
import { margins, color, fontSize } from "../../design-system";
import { Label } from "../atoms";

interface LabelProps {
  largeContainer?: boolean;
}

export const DataLabel = styled(Label)`
  font-size: 15px;
`;

export const Entry = styled(Label)`
  background: linear-gradient(to bottom, ${color.darkBlue} 0%, ${color.purple} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
`;

export const LabeledValueContainer = styled.div<LabelProps>`
  ${({ largeContainer }): string => {
    return largeContainer
      ? `
      padding: ${margins.medium};
      min-width: 450px;
      margin-bottom: ${margins.medium};
      margin-top: ${margins.medium};
      ${DataLabel} {
        font-size: ${fontSize.large};
        color: ${color.darkGrey};
      }
      ${Entry} {
        font-size: 150px;
      }
      `
      : "";
  }}
`;
