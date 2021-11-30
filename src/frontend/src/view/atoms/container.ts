import styled from "styled-components";
import { GeneralText } from "./texts";
import { color, margins } from "../../design-system";
import { Link } from "react-router-dom";

interface RoundBoxProps {
  disabled?: boolean;
}

export const RoundBox = styled.div<RoundBoxProps>`
  background-color: ${color.white};
  border-radius: 10px;
  ${({ disabled }): string => {
    return disabled
      ? `
        && {
          cursor: default;
          opacity: 0.8
        }
      `
      : "";
  }};
`;

interface FlexBoxContainerProps {
  size?: number;
}

export const FlexBoxContainer = styled.div<FlexBoxContainerProps>`
  ${({ size }): string => {
    return size
      ? `
      &&& {
        flex: ${size}
      }
      `
      : "flex: 1 ";
  }}
`;

export const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: ${color.transparentDark};
  justify-content: flex-start;
  align-items: center;
  padding: 120px 0;
  z-index: 2;
  overflow-y: scroll;
`;

export const MainModalContainer = styled.div`
  padding: ${margins.medium};
  ${GeneralText} {
    margin-top: ${margins.small};
    margin-bottom: ${margins.mini};
  }
`;

export const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${margins.mini};
`;

export const LinkContainer = styled(Link)`
  text-decoration: none;
`;

export const ImageContainer = styled(RoundBox)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
