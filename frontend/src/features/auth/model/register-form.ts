import { createEffect, createEvent, createStore, sample } from "effector";
import {
  RegistrationFormErrors,
  registrationSchema,
  RegistrationSchemaType,
} from "../lib/schema";
import { registerMutation } from "./register-mutation";

export const $formData = createStore<RegistrationSchemaType>({
  displayName: "",
  email: "",
  password: "",
  repeatPassword: "",
});
export const $showErrors = createStore<boolean>(false);
export const $errors = createStore<RegistrationFormErrors>(null);

export const fieldChanged = createEvent<{
  field: keyof RegistrationSchemaType;
  value: string;
}>();
export const validateForm = createEvent();
export const validateField = createEvent();
export const resetForm = createEvent();
const validationSuccess = createEvent<RegistrationSchemaType>();
const validationFailed = createEvent<RegistrationFormErrors>();

const validateFieldFx = createEffect((formData: RegistrationSchemaType) => {
  const result = registrationSchema.safeParse(formData);
  return result.success ? null : result.error.flatten();
});

const validateFormFx = createEffect((formData: RegistrationSchemaType) => {
  const result = registrationSchema.safeParse(formData);

  if (result.success) {
    validationSuccess(formData);
    return null;
  } else {
    const errors = result.error.flatten();
    validationFailed(errors);
    return errors;
  }
});

$formData
  .on(fieldChanged, (state, { field, value }) => ({
    ...state,
    [field]: value,
  }))
  .reset(resetForm);

$errors
  .on(validateFieldFx.doneData, (_, errors) => errors)
  .on(validateFormFx.doneData, (_, errors) => errors)
  .reset(resetForm);

$showErrors.on(validateForm, () => true).reset(resetForm);

sample({
  clock: fieldChanged,
  source: $formData,
  target: validateFieldFx,
});

sample({
  clock: validateForm,
  source: $formData,
  target: validateFormFx,
});

sample({
  clock: validationFailed,
  target: $errors,
});

sample({
  clock: validationSuccess,
  target: registerMutation.start,
});
