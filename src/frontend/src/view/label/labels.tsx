import React from "react";
import { Container, DataLabel } from "./styles";

export interface LabeledDataProps {
  label?: string;
  customColor?: string;
  disabled?: boolean;
}

export const LabeledData = ({ label = "", customColor, disabled = false }: LabeledDataProps): React.ReactElement => {
  return (
    <Container customColor={customColor} disabled={disabled}>
      <DataLabel>{label}</DataLabel>
    </Container>
  );
};
