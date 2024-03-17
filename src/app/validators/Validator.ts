import { ValidationResult } from "./validatorTypes";

export interface Validator<T> {
    validate(validationItem: T): ValidationResult;
}