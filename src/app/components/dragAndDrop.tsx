import { useRef, useState } from "react";

export default function DragAndDrop() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    if (files.length === 0) {
      // no file has been submitted
      setFiles([]);
      setErrorMessage('No files attached');
    } else {
      // write submit logic here
      // fs.readFileSync(files.pat)
      if (files.length > 1) {
        setFiles([]);
        setErrorMessage('More than one file attached');
      } else if (files[0].type === 'application/json') {
        const jsonData = await readFile(files[0])
        console.log(jsonData)
        setErrorMessage('');
      } else {
        setFiles([]);
        setErrorMessage('Not a json file');
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
    <div className="flex flex-col items-center justify-center">
      {/* <div className="flex flex-row"> */}
      <form
        className={`${dragActive ? "bg-blue-400" : "bg-blue-100"
          }  p-8 w-2/3 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center 
          hover:bg-blue-200 hover:animate-pulse`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={false}
          onChange={handleChange}
          accept=".json"
        />

        <p onClick={openFileExplorer}>
          Drag & Drop files or
          Select files
          to upload
        </p>
      </form>

      <button
          className="bg-teal-600 rounded-lg p-5 mt-3 w-auto"
          onClick={handleSubmitFile}
        >
          <span className="p-2 text-white">Process</span>
        </button>

      {errorMessage.length == 0 ? null :
          <div className="bg-red-700 text-white opacity-50 rounded-xl p-2 mt-3 w-auto">{errorMessage}</div>
        }

      {files.map((file: File, idx: number) => (
        <div key={idx} className="flex flex-row space-x-5">
          <span>{file.name}</span>
          <span
            className="text-red-500 cursor-pointer"
            onClick={() => removeFile(file.name, idx)}
          >
            remove
          </span>
        </div>
      ))}
    </div>
  );
}