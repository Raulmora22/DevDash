import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type DialogContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openDialog: () => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <DialogContext.Provider value={{ open, setOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}

export function UseGlobalDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx)
    throw new Error("useGlobalDialog debe usarse dentro de <DialogProvider>");
  return ctx;
}
