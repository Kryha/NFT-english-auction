import React, { FC } from "react";
import { useHistory } from "react-router-dom";

import { OverviewContainer, OverviewQuote } from "./styles";
import { ContainedButton, Title } from "../atoms";
import { FooterIllustration } from "../footer-illustration";

interface OverviewEmptyProps {
  title: string;
  quote: string;
  buttonLabel?: string;
  path?: string;
}

export const OverviewEmpty: FC<OverviewEmptyProps> = ({ title, quote, buttonLabel, path }) => {
  const history = useHistory();

  return (
    <>
      <OverviewContainer>
        <Title>{title}</Title>
        <OverviewQuote>{quote}</OverviewQuote>
        {!!buttonLabel && !!path && <ContainedButton onClick={(): void => history.push(path)}>{buttonLabel}</ContainedButton>}
      </OverviewContainer>
      <FooterIllustration />
    </>
  );
};
