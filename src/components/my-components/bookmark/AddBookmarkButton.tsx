import { Button } from "../../ui/button";
import { UseGlobalDialog } from "../../../providers/dialog-provider";

export function AddBookmarkButton({
  children,
  size,
}: {
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
}) {
  const { openDialog } = UseGlobalDialog();

  return (
    <Button variant="outline" size={size} onClick={openDialog}>
      {children}
    </Button>
  );
}
