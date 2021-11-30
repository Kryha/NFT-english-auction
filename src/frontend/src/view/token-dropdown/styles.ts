import styled from "styled-components";
import { fontWeight, margins } from "../../design-system";
import { DirectionIconContainer } from "../../assets";
import { RoundBox, SubHeading } from "../atoms";
import { ExpandableAreaLabelContainer } from "../expandable-area";

export const DropdownMenuContainer = styled(RoundBox)`
  justify-content: space-between;
`;

export const DropdownLabelContainer = styled(ExpandableAreaLabelContainer)`
  justify-content: flex-start;
  position: relative;

  ${SubHeading} {
    margin-right: ${margins.medium};
  }

  ${DirectionIconContainer} {
    position: absolute;
    right: 0;
    width: 35px;
    height: 12px;
  }
`;

export const DropdownHeading = styled(SubHeading)`
  font-weight: ${fontWeight.light};
`;
