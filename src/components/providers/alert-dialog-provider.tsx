"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from "react";

type DialogContextType = {
  showDialog: (params: {
    title?: string;
    content?: ReactElement;
  }) => Promise<boolean>;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const AsyncDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<ReactElement | undefined>(undefined);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null
  );

  const showDialog = useCallback(
    ({ title, content }: { title?: string; content?: ReactElement }) => {
      setTitle(title);
      setContent(content);
      setOpen(true);

      return new Promise<boolean>((resolve) => {
        setResolver(() => resolve);
      });
    },
    []
  );

  const handleCancel = () => {
    resolver?.(false);
    setOpen(false);
    setResolver(null);
  };

  const handleConfirm = () => {
    resolver?.(true);
    setOpen(false);
    setResolver(null);
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title ?? "Are you absolutely sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {content ??
                "This action cannot be undone. This will permanently delete your record and remove your data from our servers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within an AsyncDialogProvider");
  }
  return context;
};
