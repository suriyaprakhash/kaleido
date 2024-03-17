import { Validator } from "./Validator";
import { ValidationResult } from "./validatorTypes";

export abstract class FileValidator implements Validator<File[]> {
     abstract validate(files: File[]): ValidationResult;

     isEmpty(files: File[]): boolean {
          return files.length === 0;
     }

     twoOrMoreFile(files: File[]): boolean {
          return files.length > 1;
     }
}