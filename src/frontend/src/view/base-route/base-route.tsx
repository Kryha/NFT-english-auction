import React from "react";
import { BaseWrapper, ContentContainer } from "./styles";

interface BaseRouteProps {
  children?: React.ReactNode;
}

export const BaseRoute = ({ children }: BaseRouteProps): React.ReactElement => {
  return (
    <BaseWrapper>
      <ContentContainer>{children}</ContentContainer>
    </BaseWrapper>
  );
};
