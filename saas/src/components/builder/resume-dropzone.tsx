"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { UploadCloud, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PortfolioData } from "@/types/portfolio";

type Props = {
  onParsed: (data: PortfolioData) => void;
};

export function ResumeDropzone({ onParsed }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      setIsUploading(true);
      try {
        const response = await fetch("/api/upload/resume", {
          method: "POST",
          body: formData
        });
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const payload = await response.json();
        onParsed(payload.data as PortfolioData);
        toast.success("Resume parsed. Review the data and make edits.");
      } catch (error) {
        console.error(error);
        toast.error("Unable to parse resume right now.");
      } finally {
        setIsUploading(false);
      }
    },
    [onParsed]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"]
    }
  });

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/60 px-6 py-10 text-center transition hover:border-sky-500"
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
      ) : (
        <UploadCloud className="h-10 w-10 text-slate-400" />
      )}
      <p className="mt-4 text-lg font-semibold text-white">
        {isDragActive ? "Drop your resume" : "Drop your resume PDF/DOCX"}
      </p>
      <p className="mt-2 text-sm text-slate-400">
        We&apos;ll parse it with AI and pre-fill your portfolio.
      </p>
      <Button className="mt-6" disabled={isUploading}>
        {isUploading ? "Parsing..." : "Upload resume"}
      </Button>
    </div>
  );
}


