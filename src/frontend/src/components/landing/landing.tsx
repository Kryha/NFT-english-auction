import React from "react";
import { HeaderBorder, LandingPageText, LandingSubSectionText, MainWrapper, RightArrow } from "./styles";
import * as text from "../../assets/text";
import { Link } from "react-router-dom";
import { path } from "../../assets/util";

export const Landing = (): React.ReactElement => {
  return (
    <MainWrapper>
      <LandingPageText>{text.veiling}</LandingPageText>
      <HeaderBorder />
      <LandingSubSectionText>{text.landingLabel}</LandingSubSectionText>
      <Link to={path.dashboard}>
        <RightArrow />
      </Link>
    </MainWrapper>
  );
};
