import React from "react";
import { BaseRoute, Title } from "../../view";
import * as text from "../../assets";

export const NewAuction = (): React.ReactElement => {
  return (
    <BaseRoute>
      <Title>{text.newAuction}</Title>
    </BaseRoute>
  );
};
