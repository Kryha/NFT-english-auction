import React from "react";
import { Container, DataLabel } from "./styles";

interface LabeledDataProps {
  label?: string | number;
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
