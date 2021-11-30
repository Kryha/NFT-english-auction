import React from "react";
import { DirectionIcon } from "../../assets";
import { DropdownLabelContainer, DropdownHeading } from "./styles";

export interface DropdownLabelProps {
  isOpen: boolean;
  name: string;
}

export const DropdownLabel = ({ isOpen, name }: DropdownLabelProps): React.ReactElement => {
  return (
    <DropdownLabelContainer>
      <DropdownHeading>{name}</DropdownHeading>
      <DirectionIcon direction={isOpen ? "up" : "down"} />
    </DropdownLabelContainer>
  );
};
