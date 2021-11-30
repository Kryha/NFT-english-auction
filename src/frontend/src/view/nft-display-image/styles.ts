import styled from "styled-components";
import { PictureIcon } from "../../assets";
import { margins } from "../../design-system";
import { Image } from "../atoms";

interface NftDisplayProps {
  isCard?: boolean;
}

export const AddPhotoIcon = styled(PictureIcon)<NftDisplayProps>`
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  border-radius: ${margins.mini};
  ${({ isCard }): string => {
    return isCard
      ? `height: 300px;`
      : `height: 400px;
      max-height: 600px;`;
  }};
`;

export const NftImageContainer = styled(Image)<NftDisplayProps>`
  ${({ isCard }): string => {
    return isCard
      ? `height: 300px;`
      : `height: 400px;
    max-height: 600px;
    width: 500px;`;
  }};
`;
