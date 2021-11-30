import React from "react";
import { FallbackProps } from "react-error-boundary";
import { ErrorPageText, MainWrapper, ErrorButton, IconContainer } from "./styles";
import * as text from "../../assets/text";
import { color } from "../../design-system";
import { SadComputerIcon } from "../../assets/icons";

export const ErrorBoundaryFallback = ({ resetErrorBoundary }: FallbackProps): React.ReactElement => {
  return (
    <MainWrapper>
      <IconContainer>
        <SadComputerIcon />
      </IconContainer>
      <ErrorPageText>{text.somethingWentWrong}</ErrorPageText>
      <ErrorButton
        onClick={() => {
          resetErrorBoundary();
        }}
        customColor={color.white}
      >
        {text.goBackToDashboard}
      </ErrorButton>
    </MainWrapper>
  );
};
