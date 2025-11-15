"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface RenameFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (filename: string, extension: string) => void;
  currentFilename: string;
  currentExtension: string;
}

/**
 * Render a modal dialog that lets the user rename a file's name and extension.
 *
 * When opened the dialog initializes its inputs from `currentFilename` and `currentExtension`.
 * Submitting with a non-empty filename calls `onRename` with the trimmed filename and the trimmed extension (or `currentExtension` if the extension is empty). Cancel closes the dialog via `onClose`.
 *
 * @param isOpen - Whether the dialog is open
 * @param onClose - Callback invoked to close the dialog
 * @param onRename - Callback invoked with `(filename, extension)` when the form is submitted with a non-empty filename
 * @param currentFilename - Initial filename to populate the filename input when the dialog opens
 * @param currentExtension - Initial extension to populate the extension input when the dialog opens
 * @returns The rendered Rename File dialog element
 */
function RenameFileDialog({
  isOpen,
  onClose,
  onRename,
  currentFilename,
  currentExtension,
}: RenameFileDialogProps) {
  const [filename, setFilename] = React.useState(currentFilename);
  const [extension, setExtension] = React.useState(currentExtension);

  React.useEffect(() => {
    if (isOpen) {
      setFilename(currentFilename);
      setExtension(currentExtension);
    }
  }, [isOpen, currentFilename, currentExtension]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filename.trim()) {
      onRename(filename.trim(), extension.trim() || currentExtension);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
          <DialogDescription>Enter a new name for the file.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="rename-filename" className="text-right">
                Filename
              </Label>
              <Input
                id="rename-filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="col-span-2"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="rename-extension" className="text-right">
                Extension
              </Label>
              <Input
                id="rename-extension"
                value={extension}
                onChange={(e) => setExtension(e.target.value)}
                className="col-span-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!filename.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RenameFileDialog;