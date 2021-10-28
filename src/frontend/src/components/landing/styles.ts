import styled from "styled-components";
import { color } from "../../design-system";
import { HeaderHorizontalBorder } from "../../view";

export const MainWrapper = styled.div`
  background: linear-gradient(90deg, #4564de, #7c4ecb);
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
  font-size: 30px;
  line-height: 35px;
  color: ${color.white};
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 25em;
`;

export const RightArrowContainer = styled.span`
  margin-top: 40px;
  & > svg {
    fill: ${color.white};
    font-size: 200px;
  }
`;
