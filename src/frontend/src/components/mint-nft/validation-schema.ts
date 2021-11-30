import * as validation from "yup";
import { NFTMetadataSizes } from "../../../../types";
import * as text from "../../assets/text";

export const validationSchema = validation.object().shape({
  file: validation
    .object({
      type: validation.string().required(),
      name: validation.string().required(),
    })
    .required(text.requiredField),
  title: validation.string().max(NFTMetadataSizes.title, text.lessThan(text.title, NFTMetadataSizes.title)).required(text.requiredField),
  link: validation.string().max(NFTMetadataSizes.link, text.lessThan(text.link, NFTMetadataSizes.link)),
  description: validation
    .string()
    .max(NFTMetadataSizes.description, text.lessThan(text.description, NFTMetadataSizes.description))
    .required(text.requiredField),
  category: validation.string().required(text.requiredField),
});
