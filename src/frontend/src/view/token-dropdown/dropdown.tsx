import React from "react";
import { ExpandableArea } from "..";
import { DropdownLabel } from "./dropdown-label";
import { DropdownMenuContainer } from "./styles";

interface CreditMaterialProps {
  children: React.ReactNode;
  name: string;
  data: React.ReactNode;
}

export const DropdownMenu = ({ children, name, data }: CreditMaterialProps): React.ReactElement => {
  return (
    <DropdownMenuContainer>
      <ExpandableArea title={name} labelElement={DropdownLabel} data={data}>
        {children}
      </ExpandableArea>
    </DropdownMenuContainer>
  );
};
