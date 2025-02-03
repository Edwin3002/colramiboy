"use client";

import DragzoneInput from "@/components/ui/inputs/DragzoneInput";
import { useState } from "react";

const Payment = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onChange = (e: File[]) => {
    setFiles(e);
  };
  return (
    <div className="flex justify-center mt-20">
      <div className="w-sm h-sm lg:h-lg lg:w-1/4 bg-[#ead1ac] dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Adjuntar comprobante
        </h2>
        <DragzoneInput files={files} onDrop={onChange} />
      </div>
    </div>
  );
};

export default Payment;
