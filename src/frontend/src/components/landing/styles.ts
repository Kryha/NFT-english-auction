import styled from "styled-components";
import { color, fontSize, margins } from "../../design-system";
import { HeaderHorizontalBorder } from "../../view";
import { RightArrowIcon } from "../../assets/icons";

export const MainWrapper = styled.div`
  background: ${color.sidebarColor};
  height: 100%;
  width: 100%;
  text-align: center;
`;

export const LandingPageText = styled.h1`
  font-weight: 800;
  font-size: 6.25rem;
  line-height: 129px;
  color: ${color.white};
  padding-top: 300px;
  text-transform: uppercase;
`;

export const HeaderBorder = styled(HeaderHorizontalBorder)`
  background-color: ${color.white};
  width: 700px;
  margin: 0 auto;
`;

export const LandingSubSectionText = styled.h4`
  font-weight: 100;
  font-size: ${fontSize.large};
  line-height: 35px;
  color: ${color.white};
  margin-top: ${margins.large};
  margin-left: auto;
  margin-right: auto;
  width: 25em;
  text-transform: capitalize;
`;

export const RightArrow = styled(RightArrowIcon)`
  fill: ${color.white};
  width: 100px;
  height: 100px;
  margin-top: ${margins.large};
`;
