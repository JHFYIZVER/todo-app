import { FaBookOpenReader } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { MenuBar } from "../menu/menu";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-accent text-foreground">
      <div className="header-wrapper max-w-[1440px] p-5 w-full mx-auto flex items-center justify-between gap-3">
        <Link className="flex items-center gap-3 font-black text-lg" href={"/"}>
          <FaBookOpenReader />
          TodoApp
        </Link>
        <nav></nav>
        <div className="flex items-center gap-2">
          <Link
            className="border size-8 flex items-center justify-center bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md"
            href={"/dashboard/profile"}
          >
            <FaRegUserCircle className="size-5" />
          </Link>
          <MenuBar />
        </div>
      </div>
    </header>
  );
};
