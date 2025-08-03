import {
  isEmail,
  isLessThanDate,
  isMinMaxDate,
  isMoreThanDate,
  isNumeric,
  isOnlyLetters,
  isPhone,
  isPositiveNumeric,
  isValidDate,
} from '~/composables/formValidation/utils';
import type { FieldConfig, UseFormWithValidation } from '~/composables/formValidation/types';
import { ValidationRules } from '~/composables/formValidation/types';

export function useFormWithValidation<T extends Record<string, any>>(
  fields: FieldConfig<T>[]
): UseFormWithValidation<T> {
  const form = reactive({
    values: {} as Record<keyof T, string | boolean>,
    errors: {} as Record<keyof T, string[]>,
    isInFocus: {} as Record<keyof T, boolean>,
  }) as {
    //Нужно чтобы обойти UnwrapRef и получить тип
    values: Record<keyof T, string | boolean>;
    errors: Record<keyof T, string[]>;
    isInFocus: Record<keyof T, boolean>;
  };

  fields.forEach(({ name, value }) => {
    form.values[name] = value;
    form.errors[name] = [];
    form.isInFocus[name] = false;
  });

  const validateField = (field: keyof T): boolean => {
    const rules = fields.find((f) => f.name === field)?.rules;
    if (!rules) {
      return false;
    }
    form.errors[field] = [];
    //Значение для чекбокса булево, а методы работают со строками
    const value =
      typeof form.values[field] === 'boolean' ? (!form.values[field] ? '' : 'true') : String(form.values[field]);

    rules.forEach((rule) => {
      switch (rule.type) {
        case ValidationRules.Required:
          if (!value) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.MinLength:
          if (value.length < rule.value) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.MaxLength:
          if (value.length > rule.value) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isEmail:
          if (!isEmail(value)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isNumeric:
          if (!isNumeric(value)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isPositiveNumeric:
          if (!isPositiveNumeric(value)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isMinMaxDate:
          if (!isMinMaxDate(value, rule.minDate, rule.maxDate)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isLessThanDate:
          if (!isLessThanDate(value, rule.borderDate)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isMoreThanDate:
          if (!isMoreThanDate(value, rule.borderDate)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isValidDate:
          if (!isValidDate(value)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isOnlyLetters:
          if (!isOnlyLetters(value)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isPhone:
          if (!isPhone(value)) {
            form.errors[field].push(rule.message);
          }
          break;
        case ValidationRules.isAnyFilled:
          //TODO
          break;
      }
    });
    return !form.errors[field].length;
  };

  function validateForm(): boolean {
    let isFormValid = true;
    //Нужно пройтись по всем и сделать setTouched, чтобы отразить ошибки, если сразу нижимаем отправить форму
    fields.forEach(({ name }) => {
      setInFocusValue(name, true);
      const isFieldValid = validateField(name);

      if (isFormValid && !isFieldValid) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  function setInFocusValue(field: keyof T, value: boolean) {
    form.isInFocus[field] = value;
  }

  //TODO добавлять ошибки валидации с бэка, после сабмита
  function errorsToShow(field: keyof T) {
    return form.isInFocus[field] ? form.errors[field] : [];
  }

  async function sendForm(params: {
    beforeSend?: (formData: FormData) => Promise<void>;
    send: (formData: FormData) => Promise<any>;
    afterSend?: (response: any, formData: FormData) => Promise<void>;
  }) {
    if (!validateForm()) {
      return {};
    }

    const { beforeSend, send, afterSend } = params;

    const formData = new FormData();
    Object.entries(form.values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    await beforeSend?.(formData);

    const data = await send(formData);

    await afterSend?.(data, formData);

    return data;
  }

  return { form, validateForm, validateField, setInFocusValue, errorsToShow, sendForm };
}
