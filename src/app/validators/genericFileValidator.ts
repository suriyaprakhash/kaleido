import { FileValidator } from "./FileValidator";
import { JsonFileValidator } from "./JsonFileValidator";
import { FileValidationType, ValidationResult } from "./validatorTypes";

const fileValidator: FileValidator = new JsonFileValidator();

export function validateFiles(files: File[], validationType: FileValidationType): ValidationResult {
    var validationResult: ValidationResult;
    switch(validationType) { 
        case 'json': {
           validationResult = fileValidator.validate(files);
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

// function jsonValidation(files: File[]): ValidationResult {
//     if (isEmpty(files)) {
//         return {
//             isValid: false,
//             errorMessage: 'No file provided'
//         }
//     }

//     if (twoOrMoreFile(files)) {
//         return {
//             isValid: false,
//             errorMessage: 'More than one file provided'
//         }
//     }

//     if (!isJson(files[0])) {
//         return {
//             isValid: false,
//             errorMessage: 'The file is not a JSON'
//         }
//     }
    
//     return {
//         isValid: true
//     }

// }

// function isEmpty(files: File[]): boolean {
//     return files.length === 0;
// }

// function twoOrMoreFile(files: File[]): boolean {
//     return files.length > 1;
// }

// function isJson(file:File): boolean {
//     return file.type === 'application/json';
// }

