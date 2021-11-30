import React, { FC } from "react";

import { BaseWrapper, ContentContainer } from "./styles";

export const BaseRoute: FC = ({ children }) => {
  return (
    <BaseWrapper>
      <ContentContainer>{children}</ContentContainer>
    </BaseWrapper>
  );
};
