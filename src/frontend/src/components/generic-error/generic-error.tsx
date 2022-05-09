import React, { FC } from "react";

import { ErrorPageText, MainWrapper, ErrorButton, IconContainer } from "./styles";
import * as text from "../../assets/text";
import { color } from "../../design-system";
import { SadComputerIcon } from "../../assets/icons";
import { useHistory } from "react-router-dom";
import { path } from "../../assets/util/paths";
import * as constant from "../../assets/util/constants";
import { ErrorProps } from "../../../../types";

export const GenericError: FC<ErrorProps> = ({ errorMessage, errorTitle, returnRoute }) => {
  const history = useHistory();

  const redirect = (): void => {
    if (returnRoute) {
      if (returnRoute === constant.BACK) {
        history.goBack();
      } else {
        history.push(returnRoute);
      }
    } else {
      history.push(path.dashboard);
    }
  };

  return (
    <MainWrapper>
      <IconContainer>
        <SadComputerIcon />
      </IconContainer>

      <ErrorPageText>{errorTitle || text.somethingWentWrong}</ErrorPageText>
      <ErrorPageText>{errorMessage || text.genericErrorMessage}</ErrorPageText>

      <ErrorButton onClick={() => redirect()} customColor={color.white}>
        {text.goBack}
      </ErrorButton>
    </MainWrapper>
  );
};
