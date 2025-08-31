import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownLng } from "./dropdown-menu-lng";
import { Cog } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ConfigModal() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Cog />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> {t("SettingsPage")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <DropdownLng />
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-2 w-full">
              <DialogClose asChild>
                <Button variant="destructive" className="flex-1">
                  {t("CloseButton")}
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
