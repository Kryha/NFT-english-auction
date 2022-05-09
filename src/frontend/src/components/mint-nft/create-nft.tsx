import React, { FC } from "react";
import { Field, Formik, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { NewTokenFormData } from "../../../../types";
import * as text from "../../assets/text";
import { path } from "../../assets/util";
import { color } from "../../design-system";
import { changeTokenInput, useCreateTokenState } from "../../store/slices/create-token";
import { BaseRoute, Title, InputForm, FieldTextArea, SelectForm, ImageForm } from "../../view";
import { NftFormContainer, CenteredHeading, SubmitButton } from "./styles";
import { validationSchema } from "./validation-schema";
import { selectOptions } from "./options";

export const CreateNft: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { formData } = useCreateTokenState();

  const onSubmit = (values: NewTokenFormData) => {
    dispatch(changeTokenInput(values));
    history.push(`${path.mintNft}${path.preview}`);
  };

  return (
    <BaseRoute>
      <Title>{text.createNewNft}</Title>
      <NftFormContainer>
        <CenteredHeading>{text.createNewNft}</CenteredHeading>
        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ handleSubmit, isValid, values, setFieldValue }: FormikProps<NewTokenFormData>) => {
            const isSubmitButtonDisabled = !values || !isValid;

            return (
              <form onSubmit={handleSubmit}>
                <ImageForm setFieldValue={setFieldValue} />
                <InputForm name="title" label={text.name} placeholder={text.name} customColor={color.offWhite} />
                <InputForm name="link" label={text.externalLink} placeholder={text.externalLink} customColor={color.offWhite} />
                <InputForm
                  name="description"
                  label={text.description}
                  InputElement={FieldTextArea}
                  placeholder={text.description}
                  customColor={color.offWhite}
                />
                <Field
                  name="category"
                  options={selectOptions}
                  component={SelectForm}
                  placeholder={text.selectCategory}
                  label={text.category}
                />
                <SubmitButton backgroundColor={color.sidebarColor} fontColor={color.white} type="submit" disabled={isSubmitButtonDisabled}>
                  {text.next}
                </SubmitButton>
              </form>
            );
          }}
        </Formik>
      </NftFormContainer>
    </BaseRoute>
  );
};
