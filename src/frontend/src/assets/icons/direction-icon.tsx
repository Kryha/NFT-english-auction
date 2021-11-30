// Arrow by Ghiyats Mujtaba from the Noun Project

import React from "react";
import styled from "styled-components";

interface DirectionOption {
  direction?: "up" | "down" | "left" | "right";
}

export const DirectionIconContainer = styled.svg<DirectionOption>`
  ${({ direction }): string => {
    switch (direction) {
      case "up":
        return `transform: rotate(180deg);`;
      case "down":
        return `transform: rotate(0);`;
      case "right":
        return `transform: rotate(-90deg);`;
      case "left":
        return `transform: rotate(90deg);`;
      default:
        return ``;
    }
  }}
`;

export const DirectionIcon = ({ direction = "left" }: DirectionOption): React.ReactElement => {
  return (
    <DirectionIconContainer
      direction={direction}
      width="20"
      height="10"
      viewBox="0 0 668 375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M363 363L656 71C672 54 672 28 656 12C640 -4 613 -4 597 12L334 275L71 12C54 -4 28 -4 12 12C-4 28 -4 54 12 71L304 363C321 379 347 379 363 363Z"
        fill="black"
      />
    </DirectionIconContainer>
  );
};
