import React from "react";
import { FlexBoxContainer, LabeledData } from "../../view";
import * as text from "../../assets/text";
import { HeadingContainer } from "./styles";
import { MEDIUM_FLEXBOX_SIZE, LARGE_FLEXBOX_SIZE, SMALL_FLEXBOX_SIZE } from "../../assets/util/constants";

export const BidHeader = (): React.ReactElement => {
  return (
    <HeadingContainer>
      <FlexBoxContainer size={LARGE_FLEXBOX_SIZE}>
        <LabeledData label={text.name} />
      </FlexBoxContainer>
      <FlexBoxContainer size={SMALL_FLEXBOX_SIZE}>
        <LabeledData label={text.estimatedValue} />
      </FlexBoxContainer>
      <LabeledData label={text.yourBid} />
      <LabeledData label={text.highestBid} />
      <FlexBoxContainer size={MEDIUM_FLEXBOX_SIZE}>
        <LabeledData label={text.timeLeft} />
      </FlexBoxContainer>
      <LabeledData label={text.status} />
    </HeadingContainer>
  );
};
