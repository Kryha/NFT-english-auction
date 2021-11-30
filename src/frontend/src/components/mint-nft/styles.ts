import styled from "styled-components";
import { CancelIcon, PictureIcon } from "../../assets";
import { color, margins } from "../../design-system";
import { ButtonBase, FieldTextArea, RoundBox, ContainedButton, Heading } from "../../view";

export const NftFormContainer = styled(RoundBox)`
  padding: 50px;
  margin-top: ${margins.medium};
`;

export const CenteredHeading = styled(Heading)`
  margin-bottom: ${margins.medium};
  text-align: center;
`;

export const FormTextArea = styled.div`
  ${FieldTextArea} {
    width: 100%;
    min-height: 200px;
    padding: 0px 0px -5px 0px;
    margin-top: ${margins.small};
    background-color: ${color.offWhite};
    color: ${color.black};
    border: none;
  }
`;

export const ButtonContainer = styled(ButtonBase)`
  margin-left: ${margins.small};
`;

export const Box = styled.div`
  display: flex;
  margin-top: ${margins.big};
`;

export const ModalWrapper = styled.div`
  max-width: 450px;
  background-color: ${color.white};
  border-radius: ${margins.mini};
  min-width: 350px;
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${Heading} {
    margin-right: ${margins.medium};
  }
`;

export const CancelCrossIcon = styled(CancelIcon)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const AddPhotoIcon = styled(PictureIcon)`
  width: 400px;
  height: 400px;
`;

export const IconContainer = styled.span`
  display: flex;
  margin: ${margins.medium};
`;

export const SubmitButton = styled(ContainedButton)`
  max-width: 150px;
  margin-top: ${margins.medium};
`;
