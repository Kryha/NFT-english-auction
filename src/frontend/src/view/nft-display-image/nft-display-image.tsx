import React from "react";
import { AddPhotoIcon, NftImageContainer } from "./styles";
import { File } from "../../../../types";
import { bufferToDataURL } from "../../utils/data-encoding";
import * as text from "../../assets/text";

interface nftDisplayImageProps {
  file?: File;
  isCard?: boolean;
}

export const NftDisplayImage = ({ file, isCard = false }: nftDisplayImageProps): React.ReactElement => {
  if (!file) return <AddPhotoIcon isCard={isCard} />;
  if (!file.name) return <NftImageContainer isCard={isCard} src={bufferToDataURL(file.data)} alt={text.nft} />;
  return <AddPhotoIcon isCard={isCard} />;
};
