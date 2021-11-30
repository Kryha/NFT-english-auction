import React, { FC } from "react";
import { FieldProps } from "formik";
import Select from "react-select";
import { PropsValue } from "react-select/src/types";
import { FormLabel, MultiSelectContainer } from "./styles";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps extends FieldProps {
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  label?: string;
}

export const SelectForm: FC<CustomSelectProps> = ({ placeholder, field, form, options, label = "", isMulti = false, ...rest }) => {
  const onChange = (option: PropsValue<string | Option>) => {
    form.setFieldValue(field.name, isMulti ? (option as Option[]).map((item: Option) => item.value) : (option as Option).value);
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option: Option) => field.value.indexOf(option.value) >= 0)
        : options.find((option: Option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return (
    <>
      {!!label && <FormLabel>{label}</FormLabel>}
      <MultiSelectContainer>
        <Select
          name={field.name}
          value={getValue()}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          isMulti={isMulti}
          classNamePrefix="react-select"
        />
      </MultiSelectContainer>
    </>
  );
};
