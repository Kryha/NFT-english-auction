import React, { FC } from "react";

import { LinkContainer } from "../";
import { Container } from "./styles";
import { DirectionIcon } from "../../assets";

interface BackWithLinkProps {
  link: string;
}

export const BackWithLink: FC<BackWithLinkProps> = ({ link }) => {
  return (
    <Container>
      <LinkContainer to={link}>
        <DirectionIcon direction="left" />
      </LinkContainer>
    </Container>
  );
};
