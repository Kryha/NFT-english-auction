import React, { FC } from "react";
import styled from "styled-components";

interface DirectionOption {
  direction?: "up" | "down" | "left" | "right";
}

export const DirectionIconContainer = styled.svg<DirectionOption>`
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
export const DirectionIcon: FC<DirectionOption> = ({ direction = "left" }) => {
  return (
    <DirectionIconContainer direction={direction} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 7.14645L6.00002 11.6464L5.64647 12L6.00002 12.3536L10.5 16.8536L11.2071 16.1464L7.56068 12.5L18.3536 12.5L18.3536 11.5L7.56068 11.5L11.2071 7.85355L10.5 7.14645Z"
        fill="#453C62"
      />
    </DirectionIconContainer>
  );
};
