import React from "react";
import { BaseRoute, Title } from "../../view";
import * as text from "../../assets";

export const MyBids = (): React.ReactElement => {
  return (
    <BaseRoute>
      <Title>{text.myBids}</Title>
    </BaseRoute>
  );
};
