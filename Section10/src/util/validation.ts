//Validatable Interface
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

//validate function
export function validate(validatebleInput: Validatable) {
  let isValid = true;
  //required validation
  if (validatebleInput.required) {
    isValid = isValid && validatebleInput.value.toString().trim().length !== 0;
  }
  //validations for string
  if (typeof validatebleInput.value === 'string') {
    //min length validation
    if (validatebleInput.minLength != null) {
      isValid =
        isValid && validatebleInput.value.length >= validatebleInput.minLength;
    }
    //max length validation
    if (validatebleInput.maxLength != null) {
      isValid =
        isValid && validatebleInput.value.length <= validatebleInput.maxLength;
    }
  }
  //validations for number
  if (typeof validatebleInput.value === 'number') {
    //min length validation
    if (validatebleInput.min != null) {
      isValid = isValid && validatebleInput.value >= validatebleInput.min;
    }
    //max length validation
    if (validatebleInput.max != null) {
      isValid = isValid && validatebleInput.value <= validatebleInput.max;
    }
  }
  //return final validation result
  return isValid;
}
