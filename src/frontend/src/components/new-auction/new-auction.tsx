import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormikProps, Formik, ErrorMessage } from "formik";

import { BaseRoute, InputForm, Title, FieldTextArea, WarningText } from "../../view";
import * as text from "../../assets/text";
import { color } from "../../design-system";
import { path } from "../../assets/util";
import { setCreateAuction, useCreateAuctionState } from "../../store";
import { AuctionContainer, FormRow, NextButton } from "./styles";
import { validationSchema } from "./validation-schema";
import { NewAuctionFormData } from "../../../../types";

export const NewAuction: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { formData } = useCreateAuctionState();

  const onSubmit = (values: NewAuctionFormData) => {
    values.nftId = BigInt(values.nftId);
    dispatch(setCreateAuction(values));
    history.push(`${path.newAuction}${path.preview}`);
  };

  return (
    <BaseRoute>
      <Title>{text.newAuction}</Title>
      <AuctionContainer>
        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ handleSubmit, isSubmitting, isValid, values }: FormikProps<NewAuctionFormData>) => {
            const isSubmitButtonDisabled = isSubmitting || !isValid || !values;

            return (
              <form onSubmit={handleSubmit}>
                <InputForm name="name" label={text.name} />
                <ErrorMessage name="startPrice" component={WarningText} />
                <ErrorMessage name="minIncrement" component={WarningText} />
                <FormRow>
                  <InputForm type="number" name="startPrice" label={text.minimumAskingPrice} isRow={true} />
                  <InputForm type="number" name="minIncrement" label={text.minimumIncrementAmount} isRow={true} />
                </FormRow>
                <ErrorMessage name="durationInDays" component={WarningText} />
                <ErrorMessage name="buyNowPrice" component={WarningText} />
                <FormRow>
                  <InputForm type="number" name="durationInDays" label={text.auctionDurationInDays} isRow={true} />
                  <InputForm type="number" name="buyNowPrice" label={text.buyNowPrice} isRow={true} />
                </FormRow>
                <InputForm name="nftId" label={text.nftId} />
                <InputForm name="description" label={text.about} InputElement={FieldTextArea} />
                <NextButton customColor={color.green} type="submit" disabled={isSubmitButtonDisabled}>
                  {text.next}
                </NextButton>
              </form>
            );
          }}
        </Formik>
      </AuctionContainer>
    </BaseRoute>
  );
};
