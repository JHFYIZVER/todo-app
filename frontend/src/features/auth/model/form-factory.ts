import { createEffect, createEvent, createStore, sample } from "effector";
import { createFactory } from "@withease/factories";
import { ZodSchema } from "zod";

interface FormFactoryConfig<T, E> {
  schema: ZodSchema<T>;
  initialData: T;
  mutation: any;
}

export const createFormFactory = createFactory(
  <T extends object, E>(config: FormFactoryConfig<any, any>) => {
    const $formData = createStore<T>(config.initialData);
    const $showErrors = createStore<boolean>(false);
    const $errors = createStore<E | null>(null);

    const fieldChanged = createEvent<{ field: keyof T; value: string }>();
    const validateForm = createEvent();
    const validateField = createEvent();
    const resetForm = createEvent();
    const validationSuccess = createEvent<T>();
    const validationFailed = createEvent<E>();

    const validateFieldFx = createEffect((formData: T) => {
      const result = config.schema.safeParse(formData);
      return result.success ? null : (result.error.flatten() as E);
    });

    const validateFormFx = createEffect((formData: T) => {
      const result = config.schema.safeParse(formData);

      if (result.success) {
        validationSuccess(formData);
        return null;
      } else {
        const errors = result.error.flatten() as E;
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
      target: config.mutation,
    });

    return {
      $formData,
      $showErrors,
      $errors,
      fieldChanged,
      validateForm,
      validateField,
      resetForm,
      validationSuccess,
      validationFailed,
      validateFieldFx,
      validateFormFx,
    };
  }
);
