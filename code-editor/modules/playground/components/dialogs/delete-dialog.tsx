import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  itemName?: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * Render an alert dialog prompting the user to confirm deletion of an item.
 *
 * The dialog's visibility is controlled by `isOpen` and `setIsOpen`. The `description`
 * string may include a "{item}" token which will be replaced with `itemName` wrapped in quotes.
 *
 * @param isOpen - Whether the dialog is currently open
 * @param setIsOpen - Callback to update the dialog open state
 * @param title - Dialog title (defaults to "Delete Item")
 * @param description - Dialog description; supports a "{item}" placeholder
 * @param itemName - Name of the item to inject into the description when "{item}" is present
 * @param onConfirm - Callback invoked when the confirm action is clicked
 * @param confirmLabel - Label for the confirm button (defaults to "Delete")
 * @param cancelLabel - Label for the cancel button (defaults to "Cancel")
 * @returns The AlertDialog React element configured with the provided props
 */
export function DeleteDialog({
  isOpen,
  setIsOpen,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName,
  onConfirm,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: DeleteDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description.replace("{item}", `"${itemName}"`)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}