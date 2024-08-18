import * as yup from "yup";
import { countries } from "./countries";

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Z][a-z]*$/, "First letter must be uppercase"),
  age: yup
    .number()
    .transform((value, originalValue) =>
      originalValue instanceof String && originalValue.trim() === ""
        ? undefined
        : value,
    )
    .required("Age is required")
    .integer("Age must be integer")
    .positive("Age must be positive"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/\d/, "Must contain a number")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[^a-zA-Z0-9]/, "Must contain a special character")
    .min(8, "Password must be at least 8 characters long"),
  confirm: yup
    .string()
    .required("Confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup.string().required(),
  terms: yup
    .boolean()
    .required("Accept terms and conditions")
    .oneOf([true], "Please accept terms and conditions"),
  files: yup
    .mixed<FileList>()
    .required("Picture is required")
    .transform((value) => {
      return value instanceof FileList ? value[0] : value;
    })
    .test(
      "fileType",
      "Unsupported File Format",
      (value) =>
        value instanceof File &&
        ["image/jpeg", "image/png"].includes(value.type),
    )
    .test(
      "fileSize",
      "File too large",
      (value) => value instanceof File && value.size <= 2000000,
    ),
  country: yup
    .string()
    .required("Country is required")
    .oneOf(countries, "Country is not in the list"),
});
