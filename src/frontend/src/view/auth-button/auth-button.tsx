import React, { FC } from "react";

import { ButtonBase } from "..";
import { color } from "../../design-system";
import * as text from "../../assets";
import { useAuth } from "../../hooks";

export const AuthButton: FC = () => {
  const auth = useAuth();
  const buttonText = auth.isAuthenticated ? text.logout : text.login;

  const handleAuth = () => {
    if (auth.isAuthenticated) {
      auth.logout();
    } else {
      auth.login();
    }
  };

  return (
    <ButtonBase onClick={() => handleAuth()} customColor={color.white}>
      {buttonText}
    </ButtonBase>
  );
};
