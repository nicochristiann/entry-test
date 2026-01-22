"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "To Do", url: "/todos" },
  { title: "Post", url: "/posts" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex gap-2 border rounded-full p-1 w-fit">
        {navItems.map((item) => {
          const isActive = pathname === item.url;

          return (
            <Link
              key={item.url}
              href={item.url}
              className={`
                text-lg rounded-full py-2 px-4 transition-all duration-150
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10"
                }
              `}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
