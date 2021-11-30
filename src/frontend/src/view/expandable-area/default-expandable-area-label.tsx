import React from "react";
import { DirectionIcon } from "../../assets";
import { ExpandableAreaLabelContainer, StyledSubheading } from "./styles";

interface DefaultExpandableAreaLabelProps {
  name: string;
  isOpen: boolean;
}

export const DefaultExpandableAreaLabel = ({ name, isOpen }: DefaultExpandableAreaLabelProps): React.ReactElement => {
  return (
    <ExpandableAreaLabelContainer>
      <StyledSubheading>{name}</StyledSubheading>
      <DirectionIcon direction={isOpen ? "up" : "down"} />
    </ExpandableAreaLabelContainer>
  );
};
