export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

export type FileValidationType = 'json';
// export type SpringBeanJsonValidationErrorTypes = 'InvalidSpringBeanJson' | 'NotAJson' | 'MultipleFiles';