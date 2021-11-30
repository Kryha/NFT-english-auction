import styled from "styled-components";
import { DirectionIconContainer } from "../../assets";
import { margins } from "../../design-system";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${DirectionIconContainer} {
    width: 40px;
    height: ${margins.small};
  }
`;
