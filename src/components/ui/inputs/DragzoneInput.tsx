"use client";

import Image from "next/image";
import React, { useState } from "react";

type DropzoneProps = {
  files: File[];
  onDrop: (files: File[]) => void;
  accept?: string; // Especificar los tipos de archivo que se pueden aceptar (por ejemplo, 'image/png, image/jpeg')
  maxSize?: number; // Tamaño máximo en bytes
};

const DragzoneInput: React.FC<DropzoneProps> = ({
  files = [],
  onDrop,
  accept = "image/svg+xml,image/png,image/jpg,image/jpeg,application/pdf",
  maxSize = 4000000,
}) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);

    handleFiles(files);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    setError(null); // Reset error
    const validFiles: File[] = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        setError(`El archivo ${file.name} es demasiado grande.`);
        return;
      }

      const isValid = accept
        .split(",")
        .some((type) => file.type.includes(type.trim()));
      if (isValid) {
        validFiles.push(file);
      } else {
        setError(`El archivo ${file.name} no es un formato válido.`);
      }
    });

    if (validFiles.length > 0) {
      onDrop(validFiles);
    }
  };

  const removeFile = () => {
    onDrop([]); // Llama a onDrop con un array vacío para eliminar el archivo
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${
        dragging ? "bg-gray-200" : "bg-gray-50"
      } py-1`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {files?.[0] ? (
        <div className="relative">
          {files?.[0].type === "application/pdf" ? (
            <object
              data={URL.createObjectURL(files[0])}
              type="application/pdf"
              className="rounded-lg w-110 h-110 object-cover"
            />
          ) : (
            <Image
              src={URL.createObjectURL(files[0])}
              width={440}
              height={440}
              alt="Document"
              className="rounded-lg w-110 h-110 object-cover"
            />
          )}
          <button
            onClick={removeFile}
            className="absolute top-[-10] right-[-10] bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
          >
            <Image
              src="icons/trash.svg"
              width={20}
              height={20}
              alt="trash"
              className="rounded-lg"
            />
          </button>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-110 h-110 border-2 ${
            error ? "border-red-300" : "border-gray-300"
          } border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
        >
          <div className="flex flex-col items-center justify-center p-5">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept={accept}
            multiple
            onChange={handleFileSelect}
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </label>
      )}
    </div>
  );
};

export default DragzoneInput;
