import React, { useState } from "react";
import { LabelContainer, ExpandableContainer, ExpandableAreaWrap } from "./styles";
import { DefaultExpandableAreaLabel } from "./default-expandable-area-label";

interface ExpandableAreaProps {
  labelElement?: React.ElementType;
  children: React.ReactNode;
  openInitial?: boolean;
  title?: string;
}

export const ExpandableArea = <I extends Record<string, React.ReactNode>>({
  labelElement,
  children,
  openInitial = false,
  title = "",
  ...rest
}: ExpandableAreaProps & I): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(openInitial);
  const Label = labelElement || DefaultExpandableAreaLabel;

  return (
    <ExpandableAreaWrap>
      <LabelContainer onClick={(): void => setIsOpen(!isOpen)}>
        <Label name={title} isOpen={isOpen} {...rest} />
      </LabelContainer>
      <ExpandableContainer open={isOpen}>{children}</ExpandableContainer>
    </ExpandableAreaWrap>
  );
};
