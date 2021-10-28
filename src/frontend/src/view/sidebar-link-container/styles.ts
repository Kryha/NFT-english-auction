import styled from "styled-components";
import { margins } from "../../design-system";

export const SidebarBox = styled.div`
  margin-left: ${margins.medium};
`;

export const SidebarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${margins.small} ${margins.small} ${margins.small} 0px;
`;

export const IconContainer = styled(SidebarBox)`
  display: grid;
  place-content: center;
  margin-right: ${margins.small};

  & > svg {
    font-size: 2.5rem;
  }
`;
