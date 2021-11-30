import styled from "styled-components";
import { Mood } from "../../../../types";
import { CancelIcon } from "../../assets/icons";
import { color, margins } from "../../design-system";

interface ModalHeaderProps {
  mode: Mood;
}

export const ModalHeaderContainer = styled.div<ModalHeaderProps>`
  width: 100%;
  padding: ${margins.large};
  color: ${color.white};
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ mode }): string => {
    switch (mode) {
      case Mood.Positive:
        return `background-color: ${color.green} `;
      case Mood.Negative:
        return `background-color: ${color.orange} `;
      case Mood.Neutral:
        return `background-color: ${color.grey} `;
    }
  }};

  & .cross-icon {
    cursor: pointer;
  }
`;

export const ChildrenContainer = styled.div`
  display: flex;
`;

export const CancelCrossIcon = styled(CancelIcon)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
