import * as validation from "yup";
import { FormValues } from "./create-bid-form";
import * as text from "../../assets/text";

export const validationSchema = (minimumIncrementAmount: number): validation.SchemaOf<FormValues> =>
  validation.object().shape({
    amount: validation
      .number()
      .required(text.requiredField)
      .positive(text.largerThanZero)
      .integer(text.integerRequired)
      .test(text.minimumIncrementAmount, (value, { createError, path }) => {
        if (value && value < minimumIncrementAmount) {
          return createError({
            path,
            message: text.moreThan(text.bid, minimumIncrementAmount),
          });
        } else return true;
      }),
  });
