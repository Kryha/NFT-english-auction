import styled from "styled-components";
import { color, fontSize, margins } from "../../design-system";
import { ButtonBase, Label, SubHeading, Input, FieldTextArea, ContainedButton, Image } from "../atoms";
import { DropzoneIcon } from "../../assets";

export const BidInput = styled(Input)`
  margin-right: ${margins.mini};
  margin-top: ${margins.small};
  min-height: 65px;
  flex: 0 0 65%;
  display: inline-flex;
`;

export const FormButton = styled(ButtonBase)`
  flex: 1;
  display: inline-flex;
  margin-top: ${margins.small};
`;

export const FormLabel = styled(Label)`
  margin-top: ${margins.small};
`;

export interface ErrorProps {
  error: boolean;
}

export const TextInputError = styled.div<ErrorProps>`
  ${BidInput} {
    ${(props: ErrorProps) => props.error && `border: 2px solid ${color.orange};`}
  }
`;

export const FieldContainer = styled.div``;

export interface InputProps {
  customColor?: string;
}

export const InputContainer = styled.div<InputProps>`
  ${BidInput} {
    width: 100%;
    ${({ customColor }): string => {
      return customColor
        ? `
        background-color: ${customColor};
        border: none;
        `
        : `background-color: ${color.white};`;
    }};
  }

  ${FieldTextArea} {
    width: 100%;
    min-height: 200px;
    padding: 0px 0px -5px 0px;
    margin-top: ${margins.small};
    ${({ customColor }): string => {
      return customColor
        ? `
        background-color: ${customColor};
        border: none;`
        : `background-color: ${color.white};`;
    }};
  }
`;

export const MultiSelectContainer = styled.div`
  .react-select__control {
    background-color: ${color.offWhite};
    margin-right: ${margins.mini};
    margin-top: ${margins.small};
    border-radius: 3px;
    border: none;
  }

  .react-select__value-container {
    padding: 15px;
    font-size: ${fontSize.subtitle};
    opacity: 0.4;
  }
`;

export interface DropzoneProps {
  isRejected: boolean;
}

export const Dropzone = styled.div<DropzoneProps>`
  background: ${color.lightGrey};
  border-radius: 3px;
  text-align: center;
  border: 1px dotted ${color.grey};
  cursor: pointer;
  ${({ isRejected }): string => {
    return isRejected ? `border: 1px dotted ${color.orange};` : "";
  }};
`;

export const UploadIcon = styled(DropzoneIcon)`
  margin-top: 100px;
`;

export const UploadText = styled(SubHeading)`
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const UploadedImage = styled(Image)`
  max-height: 600px;
  margin-top: ${margins.medium};
`;

export const ReuploadButton = styled(ContainedButton)`
  margin: ${margins.small} auto;
  display: block;
`;
