import React, { FC, useEffect } from "react";
import { ErrorMessage, useField } from "formik";
import { TextInputError, FormLabel, BidInput, FieldContainer, InputContainer } from "./styles";
import { WarningText } from "../atoms";

interface FormikTextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  InputElement?: React.ElementType;
  type?: string;
  isRow?: boolean;
  customColor?: string;
}

export const InputForm: FC<FormikTextInputProps> = ({
  name,
  label = "",
  placeholder = "",
  InputElement,
  type = "text",
  isRow = false,
  customColor,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const { setTouched } = helpers;
  const InputType = InputElement || BidInput;

  useEffect(() => {
    if (field.value && !meta.touched) {
      setTouched(true, true);
    }
  }, [field.value, meta.touched, setTouched]);

  return (
    <>
      {isRow || <ErrorMessage name={name} component={WarningText} />}
      <InputContainer customColor={customColor}>
        <FieldContainer>
          {!!label && <FormLabel>{label}</FormLabel>}
          <TextInputError error={Boolean(meta.error) && meta.touched}>
            <InputType type={type} placeholder={placeholder} {...field} {...rest} onBlur={() => setTouched(true, true)} />
          </TextInputError>
        </FieldContainer>
      </InputContainer>
    </>
  );
};
