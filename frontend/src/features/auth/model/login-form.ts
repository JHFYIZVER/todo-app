import { createFormFactory } from "./form-factory";
import { loginSchema, LoginSchemaType, LoginFormErrors } from "../lib/schema";
import { loginMutation } from "./login-mutation";
import { invoke } from "@withease/factories";

export const loginForm = invoke(() =>
  createFormFactory<LoginSchemaType, LoginFormErrors>({
    schema: loginSchema,
    initialData: {
      email: "",
      password: "",
    },
    mutation: loginMutation.start,
  })
);

export const { $formData, $showErrors, $errors, fieldChanged, validateForm } =
  loginForm;
