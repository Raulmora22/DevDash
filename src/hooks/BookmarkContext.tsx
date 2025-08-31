import { createContext, useState, useContext } from "react";

interface BookmarkContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BookmarkContext = createContext<BookmarkContextProps | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <BookmarkContext.Provider value={{ open, setOpen }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function UseBookmarkContext() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkProvider"
    );
  }
  return context;
}
