import styled from "styled-components";
import { margins } from "../../design-system";
import { PictureIcon } from "../../assets/icons";

export const AddPhotoIcon = styled(PictureIcon)`
  width: 600px;
  height: 600px;
  flex: 45%;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: ${margins.medium};
  margin-top: ${margins.medium};
`;

export const TableContainer = styled.div`
  margin-left: ${margins.large};
  flex: 45%;
`;
