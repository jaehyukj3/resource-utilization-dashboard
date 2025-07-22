"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();
  const collapseRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "fas fa-tv" },
    { label: "Resource", href: "/resource", icon: "fas fa-tools" },
  ];

  // 1. 페이지 이동 시 collapse 닫기
  useEffect(() => {
    setCollapseShow("hidden");
  }, [pathname]);

  // 2. collapse 밖 클릭 시 닫기
  useEffect(() => {
    if (collapseShow === "hidden") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        collapseRef.current &&
        !collapseRef.current.contains(event.target as Node)
      ) {
        setCollapseShow("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapseShow]);

  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}
        <button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          onClick={() => setCollapseShow("bg-white py-3 px-4")}
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <i className="fas fa-bars text-sm leading-none" />
          </span>
        </button>

        {/* Brand */}
        <Link
          href="/"
          className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-2 px-0"
        >
          Resource NextJS
        </Link>

        {/* Collapse */}
        <div
          ref={collapseRef}
          className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}
        >
          {/* Collapse header */}
          <div className="md:min-w-full md:hidden block">
            <div className="flex flex-wrap">
              <div className="w-6/12">
                <Link
                  href="/"
                  className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-2 px-0"
                >
                  Resource NextJS
                </Link>
              </div>
              <div className="w-6/12 flex justify-end items-center">
                <button
                  type="button"
                  onClick={() => setCollapseShow("hidden")}
                  className="md:hidden w-9 h-9 flex items-center justify-center rounded-md hover:brightness-130 active:brightness-95 transition duration-150"
                >
                  <i className="fas fa-times text-[18px] text-blueGray-500 leading-none" />
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-4 md:min-w-full" />

          {/* Heading */}
          <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
            Admin Layout Pages
          </h6>

          {/* Navigation */}
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            {navItems.map((item) => {
              const isActive = pathname.includes(item.href);
              return (
                <li key={item.href} className="items-center">
                  <Link
                    href={item.href}
                    className={`text-xs uppercase py-3 font-bold flex items-center gap-2 ${
                      isActive
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500"
                    }`}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      <i
                        className={`${item.icon} text-sm leading-none ${
                          isActive ? "opacity-75" : "text-blueGray-300"
                        }`}
                      />
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <hr className="my-4 md:min-w-full" />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
