export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

export type ValidationType = 'SpringBeanJson';
export type SpringBeanJsonValidationErrorTypes = 'InvalidSpringBeanJson' | 'NotAJson' | 'MultipleFiles';

export function validateFiles(files: File[], validationType: ValidationType): ValidationResult {
    var validationResult: ValidationResult;
    switch(validationType) { 
        case 'SpringBeanJson': {
            validationResult = springBeanJsonValidation(files);
           break; 
        } 
        default: {
            validationResult = {
                isValid: false,
                errorMessage: 'Invalid validation type'
            };
           break; 
        } 
     } 
     return validationResult;

}

function springBeanJsonValidation(files: File[]): ValidationResult {
    if (isEmpty(files)) {
        return {
            isValid: false,
            errorMessage: 'No file provided'
        }
    }

    if (twoOrMoreFile(files)) {
        return {
            isValid: false,
            errorMessage: 'More than one file provided'
        }
    }

    if (!isJson(files[0])) {
        return {
            isValid: false,
            errorMessage: 'The file is not a JSON'
        }
    }
    
    return {
        isValid: true
    }

}

function isEmpty(files: File[]): boolean {
    return files.length === 0;
}

function twoOrMoreFile(files: File[]): boolean {
    return files.length > 1;
}

function isJson(file:File): boolean {
    return file.type === 'application/json';
}

function validateFile(file: File) {

}