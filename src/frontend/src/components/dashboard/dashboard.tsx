import React from "react";
import { BaseRoute, Title } from "../../view";
import * as text from "../../assets";

export const Dashboard = (): React.ReactElement => {
  return (
    <BaseRoute>
      <Title>{text.dashboard}</Title>
    </BaseRoute>
  );
};
