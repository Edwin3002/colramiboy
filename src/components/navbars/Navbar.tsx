"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/shadcn/sheet";
import Link from "next/link";
import { Button } from "../ui/shadcn/button";
import { ThemeToggle } from "../themes/ThemeToggle";

export default function Header({
  routes = [],
}: {
  routes: { route: string; name: string }[];
}) {
  return (
    <>
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              =
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>
              <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                {/* <MountainIcon className="h-6 w-6" /> */}
                <span className="sr-only">Logo colramiboy</span>
              </Link>
            </SheetTitle>
            <SheetTitle>
              <div className="grid gap-2 py-6">
                {routes.map(({ name, route }) => (
                  <Link
                    key={route}
                    href={"/" + route}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </SheetTitle>
            <SheetTitle>
              <ThemeToggle />
            </SheetTitle>
          </SheetContent>
        </Sheet>
        {/* <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
          <span className="sr-only">Acme Inc</span>
        </Link> */}
        <nav className="ml-auto hidden lg:flex gap-6">
          <ThemeToggle />
          {routes.map(({ name, route }) => (
            <Link
              key={route}
              href={"/" + route}
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              prefetch={false}
            >
              {name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
