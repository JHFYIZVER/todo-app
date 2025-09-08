"use client";
import Link from "next/link";
import { CgMenuRightAlt } from "react-icons/cg";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
  SheetTitle,
} from "@/shared/ui/sheet";

export const MenuBar = () => {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="cursor-pointer border flex items-center justify-center size-8 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md md:hidden"
      >
        <CgMenuRightAlt />
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link
                href={"/"}
                className="header-logo cursor-pointer text-xl w-fit font-black flex items-center gap-1"
              >
                TodoApp
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start px-4">
          <ul className="font-semibold text-lg flex flex-col gap-5">
            <li>
              <SheetClose asChild>
                <Link href={"/"}>Главная</Link>
              </SheetClose>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
