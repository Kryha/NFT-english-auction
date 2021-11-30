import styled from "styled-components";
import { fontWeight, margins } from "../../design-system";
import { SubHeading } from "../atoms";

interface ExpandableContainerProps {
  open: boolean;
}

export const LabelContainer = styled.div``;

export const ExpandableContainer = styled.div<ExpandableContainerProps>`
  overflow: hidden;
  transition: all 0.3s;
  animation-timing-function: linear;

  ${({ open }): string => {
    return open
      ? `
        &&& {
          max-height: 3500px;
        }
      `
      : `
        &&& {
          max-height: 0;
          padding-top: 0;
          padding-bottom: 0;
        }
      `;
  }}
`;

export const ExpandableAreaWrap = styled.div``;

export const ExpandableAreaLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const StyledSubheading = styled(SubHeading)`
  margin-top: ${margins.small};
  margin-bottom: ${margins.small};
  font-weight: ${fontWeight.light};
`;
