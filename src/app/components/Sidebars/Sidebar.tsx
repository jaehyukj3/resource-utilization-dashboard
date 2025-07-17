"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "fas fa-tv" },
    { label: "Resource", href: "/resource", icon: "fas fa-tools" },
  ];

  function getNavLinkClass(path: string): string {
    const isActive = pathname.includes(path);
    return `text-xs uppercase py-3 font-bold block ${
      isActive
        ? "text-lightBlue-500 hover:text-lightBlue-600"
        : "text-blueGray-700 hover:text-blueGray-500"
    }`;
  }

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white py-3 px-4")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}

          <Link
            href="/"
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          >
            Resource NextJS
          </Link>

          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block ">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/"
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  >
                    Resource NextJS
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
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
                      className={`text-xs uppercase py-3 font-bold block ${
                        isActive
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500"
                      }`}
                    >
                      <i
                        className={`${item.icon} mr-2 text-sm ${
                          isActive ? "opacity-75" : "text-blueGray-300"
                        }`}
                      ></i>{" "}
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
    </>
  );
};

export default Sidebar;
