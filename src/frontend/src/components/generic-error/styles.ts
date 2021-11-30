import styled from "styled-components";
import { ButtonBase } from "../../view";
import { color, margins } from "../../design-system";

export const MainWrapper = styled.div`
  background: ${color.offWhite};
  height: 100%;
  width: 100%;
  text-align: center;
`;

export const ErrorPageText = styled.h1`
  font-weight: 400;
  font-size: 40px;
  line-height: 89px;
  color: ${color.black};
  padding-top: ${margins.medium};
  text-transform: uppercase;
`;

export const ErrorButton = styled(ButtonBase)`
  margin-top: ${margins.medium};
  color: ${color.black};
  background: ${color.white};
  font-weight: 600;
`;

export const IconContainer = styled.div`
  padding-top: 300px;
`;
