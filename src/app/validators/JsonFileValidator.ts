import { FileValidator } from "./FileValidator";
import { ValidationResult } from "./validatorTypes";

export class JsonFileValidator extends FileValidator {
    validate(files: File[]): ValidationResult {

        if (this.isEmpty(files)) {
            return {
                isValid: false,
                errorMessage: 'No file provided'
            }
        }

        if (this.twoOrMoreFile(files)) {
            return {
                isValid: false,
                errorMessage: 'More than one file provided'
            }
        }

        if (!this.isJson(files[0])) {
            return {
                isValid: false,
                errorMessage: 'The file is not a JSON'
            }
        }

        return {
            isValid: true
        }

    }

    private isJson(file:File): boolean {
        return file.type === 'application/json';
    }
    


}