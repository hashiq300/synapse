"use client";

import React, { useRef, useState } from "react";
import { Home, Bell, Bookmark, Trash2, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  {
    name: "Home",
    icon: <Home size={20} />,
    path: "/",
  },
  {
    name: "Notification",
    icon: <Bell size={20} />,
    path: "/notifications",
  },
  {
    name: "Saved",
    icon: <Bookmark size={20} />,
    path: "/saved",
  },
  {
    name: "Deleted",
    icon: <Trash2 size={20} />,
    path: "/deleted",
  },
] as const;

const Sidebar = () => {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [isTabActive, setisTabActive] = useState(false);

  const pathname = usePathname();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onMouseEnter = () => {
    setSidebarActive(true);

    timeoutRef.current = setTimeout(() => {
      setisTabActive(true);
    }, 250);
  };

  const onMouseLeave = () => {
    setSidebarActive(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setisTabActive(false);
  };

  const isSideTabActive = (tab: String) => {
    return pathname === tab;
  };

  const sidebarVariants = {
    expanded: { width: "230px" },
    collapsed: { width: "100px" },
  };

  return (
    <motion.nav
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="h-[100vh] flex flex-col items-center justify-between bg-white py-12 transition-all z-10 fixed"
      initial={false}
      animate={isSidebarActive ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col gap-24">
        <Link href="/">
          <Image src="/icons/logo.svg" alt="logo" width={48} height={48} />
        </Link>

        <div className="flex flex-col gap-5">
          {navLinks.map((link) => {
            return (
              <Link
                href={link.path}
                key={link.name}
                className={cn(
                  "w-fit h-fit flex gap-2 p-3 px-5 rounded-full items-center justify-center hover:shadow-link",
                  isSideTabActive(link.path) && "bg-primary shadow-link"
                )}
              >
                {link.icon}
                {isTabActive && <p>{link.name}</p>}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <Link
          href="/settings"
          className={cn(
            "w-fit h-fit flex gap-2 p-3 px-5 rounded-full items-center justify-center hover:shadow-link",
            isSideTabActive("/settings") && "bg-primary"
          )}
        >
          <Settings />
          {isTabActive && <p>Settings</p>}
        </Link>

        <button className="w-fit h-fit flex gap-2 p-3 px-5 rounded-full items-center justify-center hover:shadow-link">
          <LogOut />
          {isTabActive && <p>logout</p>}
        </button>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
