import { useState } from "react";
import { getFavicon } from "../../../helpers/bookmark.helpers";
import { useLocalStorage } from "../../../hooks/use-local-storage";
import { AddBookmarkButton } from "./AddBookmarkButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "../../ui/dialog";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { UseGlobalDialog } from "../../../providers/dialog-provider";
import { useTranslation } from "react-i18next";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Ellipsis } from "lucide-react";

type SiteBookmark = {
  title: string;
  url: string;
  uuid: string;
};

export function Bookmarks() {
  const [sites, setSites] = useLocalStorage("user-sites", "");
  const [targetItem, setTargetItem] = useState<SiteBookmark | null>(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const { open, setOpen, closeDialog } = UseGlobalDialog();
  let draggedItem: SiteBookmark | null = null;
  const { t } = useTranslation();

  const handleCloseDialog = () => {
    setTitle("");
    setLink("");
    closeDialog();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (targetItem) {
      const idx = sites.findIndex(
        (item: SiteBookmark) => item.uuid === targetItem.uuid
      );
      const newList = sites.toSpliced(idx, 1, {
        title,
        url: link,
        uuid: targetItem.uuid,
      });
      setSites(newList);
    } else {
      setSites([...sites, { title, url: link, uuid: crypto.randomUUID() }]);
    }

    setTitle("");
    setLink("");
    setTargetItem(null);
    closeDialog();
  };

  const handleEdit = (id: string) => {
    const bookmark = sites.find((item: SiteBookmark) => item.uuid === id);
    if (!bookmark) return;
    setTitle(bookmark.title);
    setLink(bookmark.url);
    setTargetItem(bookmark);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    const newList = sites.filter((item: SiteBookmark) => item.uuid !== id);
    setSites(newList);
  };

  const handleTitle = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  };

  const handleLink = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setLink(target.value);
  };

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    draggedItem = sites[idx];
    const items = Array.from(
      document.querySelectorAll(
        ".bookmark-item"
      ) as NodeListOf<HTMLAnchorElement>
    );
    const icons = Array.from(
      document.querySelectorAll(".bookmark-icon") as NodeListOf<HTMLDivElement>
    );
    e.dataTransfer.setDragImage(icons[idx], 32, 32);
    items[idx].style.opacity = "0.5";
  };

  const handleDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (!draggedItem) return;
    const newList = sites.filter((item: SiteBookmark) => item !== draggedItem);
    newList.splice(idx, 0, draggedItem);
    setSites(newList);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    const icons = Array.from(
      document.querySelectorAll(".bookmark-icon") as NodeListOf<HTMLDivElement>
    );
    icons.forEach((el) => el.classList.remove("border-green-500"));
    icons[idx].classList.add("border-green-500");
  };

  const handleDragEnd = () => {
    draggedItem = null;
    const items = Array.from(
      document.querySelectorAll(
        ".bookmark-item"
      ) as NodeListOf<HTMLAnchorElement>
    );
    const icons = Array.from(
      document.querySelectorAll(".bookmark-icon") as NodeListOf<HTMLDivElement>
    );
    icons.forEach((icon) => icon.classList.remove("border-green-500"));
    items.forEach((item) => (item.style.opacity = "1"));
  };

  const bookmarks =
    sites &&
    sites.map((item: SiteBookmark, idx: number) => (
      <li key={item.uuid} onDragOver={(e) => handleDragOver(e, idx)}>
        <Popover>
          <PopoverTrigger>
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <>
              <div className="grid  gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleEdit(item.uuid)}
                >
                  {t("EditButton")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDelete(item.uuid)}
                >
                  {t("DeleteButton")}
                </Button>
              </div>
            </>
          </PopoverContent>
        </Popover>
        <a
          href={item.url}
          className="bookmark-item grid grid-cols-[88px] justify-center gap-2 text-center text-gray-500 text-base no-underline"
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, idx)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div
            className="bookmark-icon w-4 h-4 rounded-sm p-5 border border-gray-100 bg-white bg-center bg-no-repeat bg-contain m-auto transition-all duration-300"
            style={{ backgroundImage: `url(${getFavicon(item.url)})` }}
          />

          <div className="bookmark-title">
            <p className="text-xs text-gray-300 truncate">{item.title}</p>
          </div>
        </a>
      </li>
    ));

  return (
    <section className="items-center justify-center mx-auto pt-40">
      {sites.length > 0 ? (
        <ul className="flex justify-center gap-2 px-38 mt-2">{bookmarks}</ul>
      ) : (
        <div className="flex mx-auto justify-center gap-4 ">
          <AddBookmarkButton size="default">
            {t("AddBookmarkButton")}
          </AddBookmarkButton>
        </div>
      )}
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setTitle("");
            setLink("");
            setTargetItem(null);
          }
          setOpen(isOpen);
        }}
      >
        <DialogContent className="sm:max-w-[425px] ">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label> {t("BookmarkName")}</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={title}
                  onChange={handleTitle}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("BookmarkURL")}</Label>
                <Input
                  type="url"
                  name="url"
                  id="url"
                  required
                  value={link}
                  onChange={handleLink}
                />
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-2 mt-2 w-full">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    className="flex-1"
                    onClick={handleCloseDialog}
                  >
                    {t("CloseButton")}
                  </Button>
                </DialogClose>
                <Button type="submit" variant="default" className="flex-1">
                  {t("SaveButton")}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
