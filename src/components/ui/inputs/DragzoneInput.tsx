"use client";

import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Card, CardContent } from "../shadcn/card";
import { Button } from "../shadcn/button";
import { Alert, AlertDescription } from "../shadcn/alert";
import { Label } from "../shadcn/label";

type DropzoneProps = {
  files: File[];
  onDrop: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
};

const DragzoneInput: React.FC<DropzoneProps> = ({
  files = [],
  onDrop,
  accept = "image/png,image/jpg,image/jpeg,application/pdf",
  // accept = "image/svg+xml,image/png,image/jpg,image/jpeg,application/pdf",
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
    setError(null);
    const validFiles: File[] = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        setError(`El archivo ${file.name} es muy pesadp.`);
        return;
      }

      const isValid = accept
        .split(",")
        .some((type) => file.type.includes(type.trim()));
      if (isValid) validFiles.push(file);
      else setError(`El archivo no tiene un formato valido. \n"${file.name}" `);
    });

    if (validFiles.length > 0) onDrop(validFiles);
  };

  const removeFile = () => onDrop([]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card
        className={`${
          dragging ? "border-primary" : "border-border"
        } transition-colors duration-300`}
      >
        <CardContent className="p-6">
          {files?.[0] ? (
            <div className="relative">
              {files?.[0].type === "application/pdf" ? (
                <object
                  data={URL.createObjectURL(files[0])}
                  type="application/pdf"
                  className="rounded-lg w-full h-[550px] object-cover"
                />
              ) : (
                <Image
                  src={URL.createObjectURL(files[0]) || "/placeholder.svg"}
                  width={440}
                  height={440}
                  alt="Document"
                  className="rounded-lg w-full h-110 object-cover"
                />
              )}
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2"
                onClick={removeFile}
              >
                <Trash2 />
              </Button>
            </div>
          ) : (
            <Label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-[440px] border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent transition-colors duration-300"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center p-5 text-center">
                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG or PDF (MAX. 4MB)
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
            </Label>
          )}
        </CardContent>
      </Card>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DragzoneInput;
