import * as validation from "yup";
import * as text from "../../assets/text";

export const validationSchema = validation.object().shape({
  name: validation.string().required(text.requiredField),
  description: validation.string().required(text.requiredField),
  startPrice: validation.number().required(text.requiredField).positive(text.largerThanZero).integer(text.integerRequired),
  minIncrement: validation.number().required(text.requiredField).positive(text.largerThanZero).integer(text.integerRequired),
  durationInDays: validation.number().required(text.requiredField).positive(text.largerThanZero).integer(text.integerRequired),
  nftId: validation.string().required(text.requiredField),
  buyNowPrice: validation
    .number()
    .required(text.requiredField)
    .positive(text.largerThanZero)
    .integer(text.integerRequired)
    .when(["startPrice"], (startPrice: number) => {
      if (startPrice > 0) {
        return validation.number().moreThan(startPrice, text.moreThan(text.buyNowPrice, startPrice)).integer();
      }
      return validation.number();
    }),
});
