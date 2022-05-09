import React, { FC } from "react";
import { AddPhotoIcon, NftImageContainer } from "./styles";
import { File } from "../../../../types";
import { bufferToDataURL } from "../../utils/data-encoding";
import * as text from "../../assets/text";

interface NftDisplayImageProps {
  file?: File;
  isCard?: boolean;
}

export const NftDisplayImage: FC<NftDisplayImageProps> = ({ file, isCard = false }) => {
  if (!file || !file.name) return <AddPhotoIcon isCard={isCard} />;
  return <NftImageContainer isCard={isCard} src={bufferToDataURL(file.data)} alt={text.nft} />;
};
