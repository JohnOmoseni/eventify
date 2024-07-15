"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/Button";
import { Upload } from "@/constants/icons";
import { twMerge } from "tailwind-merge";
import { convertFileToUrl, toastNotify } from "@/utils";
import { useToast } from "@/components/ui/use-toast";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const { toast } = useToast();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];

    if (!selectedFile.type.startsWith("image/")) {
      toastNotify(toast, "Please select a JPG, PNG, or SVG file.", "");
      return;
    }

    // Check file size
    if (selectedFile.size > 4 * 1024 * 1024) {
      toastNotify(toast, "File size exceeds 4MB", "");
      return;
    }

    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(selectedFile));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className={twMerge(
        "flex min-h-72 cursor-pointer flex-col items-center overflow-hidden rounded-xl border border-input",
        isDragActive && "border-2 border-dotted border-ring",
      )}
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="max-h-[300px] w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center py-5">
          <span className="icon my-6 grid">
            <Upload size={70} />
          </span>

          <h3 className="my-2 px-2 text-center">
            {isDragActive
              ? "Drag the photos here...."
              : " Drag and drop here or click to select the photos"}
          </h3>
          <p className="">SVG, PNG, JPG</p>

          {!isDragActive && (
            <Button title="Select from computer" className="btn-variant mt-6" />
          )}
        </div>
      )}
    </div>
  );
}
