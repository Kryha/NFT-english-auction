import React from "react";
import { TableText } from "../atoms";
import { Spinner, SpinnerContainer } from "./styles";
import * as text from "../../assets";

interface ContentLoaderProps {
  loading: boolean;
  children?: React.ReactNode;
}

export const ContentLoader = ({ loading, children }: ContentLoaderProps): React.ReactElement => {
  return (
    <>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
          <TableText>{text.loading}</TableText>
        </SpinnerContainer>
      ) : (
        children
      )}
    </>
  );
};
