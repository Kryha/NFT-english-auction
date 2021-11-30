import { format } from "date-fns";

export const defaultDateFormat = (dateToFormat: Date | number): string => {
  return format(dateToFormat, "dd MMM yyyy, HH:mm");
};
