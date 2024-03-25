import { useRef, useState } from "react";
import { validateFiles } from "../validators/genericFileValidator";
import { ValidationResult } from "../validators/validatorTypes";
import { ActuatorType } from "../actuators/actuatorTypes";
import { ActuatorTypeDecider } from "../actuators/ActuatorTypeDecider";


export default function DragAndDrop({ validationTypeFromParent, parentCallback }: any) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  // const [validationType] = useState<ValidationType>(validationTypeFromParent);

  // var jsonData: any = parentJsonData;

  function handleChange(e: any) {
    e.preventDefault();
    console.log("File has been added");
    setErrorMessage('');
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  }

  async function handleSubmitFile() {
    const validationResult: ValidationResult = validateFiles(files, validationTypeFromParent);
    if (!validationResult.isValid) {
      setFiles([]);
      setErrorMessage(validationResult.errorMessage);
    } else {
      let jsonData: Promise<any> = await readFile(files[0]);
      console.log('handleSubmitFile() - ', jsonData);
      determineActuatorType(jsonData);
    }

    function determineActuatorType(jsonData: Promise<any>) {
      const actuatorType: ActuatorType = ActuatorTypeDecider.decide(jsonData);
      if (actuatorType === 'unknown') {
        setFiles([]);
        setErrorMessage('Unsupported content attached, try spring beans json');
      } else {
        parentCallback(jsonData, actuatorType);
      }
    }
  }


  const readFile = async (file: File): Promise<any | undefined> => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        const content = event.target?.result as string;
        try {
          const jsonData = JSON.parse(content);
          resolve(jsonData); // Resolve promise with parsed JSON data
        } catch (error) {
          console.error('Error parsing JSON:', error);
          reject(error); // Reject promise with error
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error); // Reject promise with error
      };

      reader.readAsText(file);
    });
  };

  function handleDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      for (let i = 0; i < event.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, event.dataTransfer?.files[i]]);
      }
    }
  }

  function handleDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(event: any) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: string, idx: number) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
    setErrorMessage('');
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex flex-col items-center m-4">

      {files.length === 0 &&
        <form onClick={openFileExplorer}
          className={`${dragActive ? "bg-orange-50" : "bg-orange-50"
            }  p-8 w-2/3 h-[60vh] rounded-lg text-center flex flex-col items-center justify-center cursor-pointer
          hover:bg-orange-200 hover:text-neutral-100`}
          onDragEnter={handleDragEnter}
          onSubmit={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
          <input placeholder="fileInput"
            className="hidden"
            ref={inputRef}
            type="file"
            multiple={false}
            onChange={handleChange}
            accept=".json"
          />

          <p className="text-gray-500">
          Drop your <span className="sm:text-6xl md:text-8xl animate-pulse hover:text-white">Spring actuator beans</span> json here
          </p>
        </form>}

      {files.length > 0 &&
        <div className="flex flex-col space-y-10 items-center">
          <div>Ready to<span className="text-2xl"> visualize</span>?</div>
          <div>
            <button type="button" onClick={handleSubmitFile}
              className="text-white bg-orange-600 hover:bg-orange-800  focus:bg-orange-300 
                  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2
                  dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:bg-orange-800
                  animate-bounce">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
              <span className="sr-only">Visualize</span>
            </button>
          </div>


        </div>
      }

      {errorMessage?.length! > 0 &&
        <div className="bg-red-700 text-white opacity-50 rounded-xl p-2 mt-3 w-auto">{errorMessage}</div>
      }

      {files.map((file: File, idx: number) => (
        <div key={idx} className="flex flex-row space-x-5 mt-10">
          <span className="text-neutral-500">{file.name}</span>
          <span className="text-orange-500 cursor-pointer hover:text-red-300" onClick={() => removeFile(file.name, idx)}>
            remove
          </span>
        </div>
      ))}
    </div>
  );
}