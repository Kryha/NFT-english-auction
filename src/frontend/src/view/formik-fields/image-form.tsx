import React, { FC, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Dropzone, UploadIcon, UploadText, UploadedImage, ReuploadButton } from "./styles";
import * as text from "../../assets/text";
import { WarningText } from "../atoms";
import { File } from "../../../../types";
import { useHistory } from "react-router-dom";
import { path } from "../../assets/util/paths";
import { MAX_FILE_SIZE_BYTES, SUPPORTED_FORMATS } from "../../assets/util/constants";
import { color } from "../../design-system";

interface ImageFormProps {
  setFieldValue: (field: string, value: File, shouldValidate?: boolean | undefined) => void;
}

export const ImageForm: FC<ImageFormProps> = ({ setFieldValue }) => {
  const history = useHistory();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [img, setImg] = useState<string>();

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: SUPPORTED_FORMATS,
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(acceptedFiles[0]);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uploadedFile: File = { data: arrayBuffer, type: acceptedFiles[0].type, name: `${acceptedFiles[0].name}` };
        const dataURL = URL.createObjectURL(new Blob([arrayBuffer], { type: acceptedFiles[0].type }));
        setImg(dataURL as string);
        setUploaded(true);
        setFieldValue("file", uploadedFile);
      };
      reader.onerror = () => history.push(path.error);
    },
    maxSize: MAX_FILE_SIZE_BYTES,
  });

  return (
    <>
      {Boolean(isDragReject) && <WarningText>{text.uploadError}</WarningText>}
      {uploaded && img ? (
        <>
          <UploadedImage src={img} alt={text.uploaded} />
          <ReuploadButton fontColor={color.white} backgroundColor={color.sidebarColor} onClick={() => setUploaded(false)}>
            {text.chooseAnotherImage}
          </ReuploadButton>
        </>
      ) : (
        <Dropzone isRejected={isDragReject} {...getRootProps({ className: "dropzone" })}>
          <UploadIcon />
          <input {...getInputProps()} />
          <UploadText>{text.supportFiles}</UploadText>
          <UploadText>{text.sizeLimit}</UploadText>
        </Dropzone>
      )}
    </>
  );
};
