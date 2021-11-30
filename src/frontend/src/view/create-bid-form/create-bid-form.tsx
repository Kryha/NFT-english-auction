import React, { FC } from "react";
import { ErrorMessage, Formik, FormikProps } from "formik";
import { useDispatch } from "react-redux";

import { FormButton, FormRow, InputContainer } from "./styles";
import { InputForm } from "../formik-fields";
import * as text from "../../assets";
import { color } from "../../design-system";
import { validationSchema } from "./validation-schema";
import { AuctionObject } from "../../../../types";
import { useHistory } from "react-router";
import { path } from "../../assets";
import { setCreateBid, useCreateBidState } from "../../store";
import { WarningText } from "../atoms";

export interface FormValues {
  amount: number;
}

interface Props {
  auction: AuctionObject;
  minimumIncrement: number;
}

export const CreateBidForm: FC<Props> = ({ auction, minimumIncrement }) => {
  const history = useHistory();
  const { formData } = useCreateBidState();
  const dispatch = useDispatch();

  const handleFormSubmit = (amount: number) => {
    dispatch(setCreateBid({ amount, auctionId: auction.id, auctionName: auction.name }));
    history.push(`${path.dashboard}/${auction.id}${path.reviewBidModal}`);
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema(minimumIncrement)}
      onSubmit={(values) => handleFormSubmit(values.amount)}
    >
      {({ handleSubmit, isValid, values }: FormikProps<FormValues>) => {
        const isSubmitButtonDisabled = !isValid || !values.amount;
        return (
          <form onSubmit={handleSubmit}>
            <ErrorMessage name="amount" component={WarningText} />
            <FormRow>
              <InputContainer>
                <InputForm type="number" name="amount" placeholder={text.yourMaximumBid} isRow={true} />
              </InputContainer>
              <FormButton customColor={color.green} type="submit" disabled={isSubmitButtonDisabled}>
                {text.bidNow}
              </FormButton>
            </FormRow>
            <FormButton customColor={color.blue} type="button" onClick={() => handleFormSubmit(auction.buyNowPrice)}>
              {text.buyNow}
            </FormButton>
          </form>
        );
      }}
    </Formik>
  );
};
