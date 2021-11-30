import React from "react";
import { ModalHeaderContainer, ChildrenContainer, CancelCrossIcon } from "./styles";
import { Mood } from "../../../../types";

export interface ModalHeaderProps {
  mode?: Mood;
  closeCallback: () => void;
  children: React.ReactNode;
}

export const ModalHeader = ({ mode = Mood.Neutral, closeCallback, children }: ModalHeaderProps): React.ReactElement => {
  return (
    <ModalHeaderContainer mode={mode}>
      <ChildrenContainer>{children}</ChildrenContainer>
      <CancelCrossIcon onClick={closeCallback} />
    </ModalHeaderContainer>
  );
};
