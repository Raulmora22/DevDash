import { ConfigModal } from "../components/my-components/config-modal";
import { ModeToggle } from "../components/my-components/mode-toggle";
import { Bookmarks } from "../components/my-components/bookmark/bookmarks";
import { AddBookmarkButton } from "../components/my-components/bookmark/AddBookmarkButton";
import { DialogProvider } from "../providers/dialog-provider";
import { SquarePlus } from "lucide-react";

export default function App() {
  return (
    <DialogProvider>
      <div>
        <div className="flex justify-end gap-4 p-4">
          <AddBookmarkButton size="icon">
            {" "}
            <SquarePlus />
          </AddBookmarkButton>
          <ConfigModal />
          <ModeToggle />
        </div>

        <Bookmarks />
      </div>
    </DialogProvider>
  );
}
