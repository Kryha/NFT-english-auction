import React, { FC } from "react";
import styled from "styled-components";

interface DirectionOption {
  direction?: "up" | "down" | "left" | "right";
}

export const ChevronIconContainer = styled.svg<DirectionOption>`
  ${({ direction }): string => {
    switch (direction) {
      case "right":
        return `transform: rotate(180deg);`;
      case "left":
        return `transform: rotate(0);`;
      case "down":
        return `transform: rotate(-90deg);`;
      case "up":
        return `transform: rotate(90deg);`;
      default:
        return ``;
    }
  }}
`;

export const ChevronIcon: FC<DirectionOption> = ({ direction = "left" }) => {
  return (
    <ChevronIconContainer direction={direction} width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 1L1 10L10 19" stroke="#453C62" />
    </ChevronIconContainer>
  );
};
