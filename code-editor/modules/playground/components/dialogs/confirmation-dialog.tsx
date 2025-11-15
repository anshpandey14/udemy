import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  setIsOpen: (open: boolean) => void;
}

/**
 * Render a modal confirmation dialog with a title, optional description, and Cancel/Confirm actions.
 *
 * The dialog's visibility is controlled by `isOpen` and updates are propagated via `setIsOpen`.
 *
 * @param confirmLabel - Label for the confirm button (defaults to `"Confirm"`)
 * @param cancelLabel - Label for the cancel button (defaults to `"Cancel"`)
 * @param onConfirm - Callback invoked when the confirm button is clicked
 * @param onCancel - Callback invoked when the cancel button is clicked
 * @param setIsOpen - Updater called when the dialog open state changes (receives the new open boolean)
 * @returns A React element representing the confirmation dialog
 */
export function ConfirmationDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  setIsOpen,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}