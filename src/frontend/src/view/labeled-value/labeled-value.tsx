import React from "react";
import { DataLabel, Entry, LabeledValueContainer } from "./styles";

interface LabeledValueProps {
  label: string;
  value: number;
  largeContainer?: boolean;
}

export const LabeledValue = ({ label, value, largeContainer }: LabeledValueProps): React.ReactElement => {
  return (
    <LabeledValueContainer largeContainer={largeContainer}>
      <DataLabel>{label}</DataLabel>
      <Entry>{value}</Entry>
    </LabeledValueContainer>
  );
};
