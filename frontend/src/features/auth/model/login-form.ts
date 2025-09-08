import { createEffect, createEvent, createStore, sample } from "effector";
import { LoginFormErrors, loginSchema, LoginSchemaType } from "../lib/schema";
import { loginMutation } from "./login-mutation";

export const $formData = createStore<LoginSchemaType>({
  email: "",
  password: "",
});
export const $showErrors = createStore<boolean>(false);
export const $errors = createStore<LoginFormErrors>(null);

export const fieldChanged = createEvent<{
  field: keyof LoginSchemaType;
  value: string;
}>();
export const validateForm = createEvent();
export const validateField = createEvent();
export const resetForm = createEvent();
const validationSuccess = createEvent<LoginSchemaType>();
const validationFailed = createEvent<LoginFormErrors>();

const validateFieldFx = createEffect((formData: LoginSchemaType) => {
  const result = loginSchema.safeParse(formData);
  return result.success ? null : result.error.flatten();
});

const validateFormFx = createEffect((formData: LoginSchemaType) => {
  const result = loginSchema.safeParse(formData);

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
  target: loginMutation.start,
});
