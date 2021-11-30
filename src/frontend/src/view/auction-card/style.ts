import styled from "styled-components";
import { RoundBox, TableText, CardHeading } from "../atoms";
import { color, fontWeight, margins } from "../../design-system";
import { PictureIcon } from "../../assets";

export const CardHeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${margins.medium};
`;

export const Container = styled(RoundBox)`
  padding: ${margins.medium};
  max-width: 600px;
  min-height: 630px;
  color: ${color.black};
  cursor: pointer;
  height: 100%;
  box-sizing: border-box;
  width: calc(90% - ${margins.nano});
`;

export const SectionBadge = styled.div`
  display: flex;
`;

export const ButtonEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${color.blue};
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${margins.medium};
`;

export const CardDetailText = styled(TableText)`
  font-weight: ${fontWeight.bold};
  margin-top: ${margins.small};
`;

export const HeaderContainerText = styled(CardHeading)`
  margin-top: ${margins.mini};
`;

export const AddPhotoIcon = styled(PictureIcon)`
  width: 200px;
  height: 200px;
`;
