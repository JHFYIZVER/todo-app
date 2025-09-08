import { createFormFactory } from "./form-factory";
import {
  registrationSchema,
  RegistrationSchemaType,
  RegistrationFormErrors,
} from "../lib/schema";
import { registerMutation } from "./register-mutation";
import { invoke } from "@withease/factories";

export const registrationForm = invoke(() =>
  createFormFactory<RegistrationSchemaType, RegistrationFormErrors>({
    schema: registrationSchema,
    initialData: {
      displayName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    mutation: registerMutation.start,
  })
);

export const { $formData, $showErrors, $errors, fieldChanged, validateForm } =
  registrationForm;
