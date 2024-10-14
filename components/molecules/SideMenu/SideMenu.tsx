"use client";
import React, { useEffect, useState } from "react";
import logo from "@/public/images/logo_1.png";
import Image from "next/image";
import marketplace_inactive from "@/public/images/icons/marketplace_inactive.svg";
import marketplace_active from "@/public/images/icons/marketplace_active.svg";
import users_inactive from "@/public/images/icons/users_inactive.svg";
import users_active from "@/public/images/icons/users_active.svg";
import overview_inactive from "@/public/images/icons/overview_inactive.svg";
import overview_active from "@/public/images/icons/overview_active.svg";
import payments_inactive from "@/public/images/icons/payments_inactive.svg";
import payments_active from "@/public/images/icons/payments_active.svg";
import orders_inactive from "@/public/images/icons/orders_inactive.svg";
import orders_active from "@/public/images/icons/orders_active.svg";
import reports_inactive from "@/public/images/icons/reports_inactive.svg";
import reports_active from "@/public/images/icons/reports_active.svg";
import settings_inactive from "@/public/images/icons/settings_inactive.svg";
import settings_active from "@/public/images/icons/settings_active.svg";
import category_active from "@/public/images/icons/category_active.svg";
import roles_active from "@/public/images/icons/roles_active.svg";
import roles_inactive from "@/public/images/icons/roles_inactive.svg";
import logout from "@/public/images/icons/logout.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useUtilAuth } from "@/context/UtilityContext";

const SideMenu = () => {
  const router = useRouter();
  const path = usePathname();
  const { open, setOpen } = useUtilAuth();
  const [width, setWidth] = useState(window.innerWidth);

  const menu = [
    {
      inactive: overview_inactive,
      active: overview_active,
      route: "Overview",
    },
    { inactive: users_inactive, active: users_active, route: "Users" },
    {
      inactive: payments_inactive,
      active: payments_active,
      route: "Membership",
    },
    {
      inactive: orders_inactive,
      active: category_active,
      route: "Category",
    },
    {
      inactive: marketplace_inactive,
      active: marketplace_active,
      route: "Marketplace",
    },
    { inactive: roles_inactive, active: roles_active, route: "Roles" },
    { inactive: orders_inactive, active: orders_active, route: "Orders" },
    { inactive: reports_inactive, active: reports_active, route: "Reports" },
  ];

  useEffect(() => {
    // Function to update width state when the window resizes
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  const index = menu.findIndex(
    (rte) => rte.route.toLowerCase() === path.split("/")[1].split("?")[0],
  );

  return (
    <>
      <div
        className={`${open ? "fixed bottom-0 left-0 right-0 top-0 z-20 bg-black/20 backdrop-blur-sm xl:hidden" : "hidden"}`}
      />
      <aside
        className={`transition2 fixed bottom-0 top-0 z-20 flex shrink-0 flex-col bg-secondary xl:sticky xl:h-screen ${open ? "w-3/5 max-xl:left-0 md:w-2/5 xl:w-1/5" : "max-xl:-left-64 xl:w-[108px]"}`}
      >
        <div
          className={`transition2 relative flex h-16 items-center justify-between bg-primary py-2 xl:h-[88px] ${open ? "px-3  xl:px-9" : "py-4 px-3 xl:px-6"}`}
        >
          <span
            className={`transition2 relative ${open ? "w-[100px] xl:w-[164px]" : "w-[0px] overflow-hidden"}`}
          >
            <Image
              src={logo}
              alt="company logo"
              className={`transition2 h-auto ${open ? "w-[100px] xl:w-[164px]" : "w-[0px] overflow-hidden"}`}
            />{" "}
            <p className="absolute -bottom-1.5 right-0 text-xs italic text-white">
              Be Inspired
            </p>
          </span>

          <button
            onClick={() => setOpen(!open)}
            className={`transition2 ${open ? "left-[100%] translate-x-[0%]" : "absolute left-[50%] z-10 -translate-x-[50%]"}`}
          >
            {open && (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5 xl:h-6 xl:w-6"
              >
                <path
                  d="M20.295 5.29492L16.5928 8.99992H18.3741C18.6724 8.99992 18.9586 9.11845 19.1696 9.32942C19.3805 9.5404 19.4991 9.82655 19.4991 10.1249C19.4991 10.4233 19.3805 10.7094 19.1696 10.9204C18.9586 11.1314 18.6724 11.2499 18.3741 11.2499H13.8741C13.5757 11.2499 13.2895 11.1314 13.0786 10.9204C12.8676 10.7094 12.7491 10.4233 12.7491 10.1249V5.62492C12.7491 5.32655 12.8676 5.0404 13.0786 4.82942C13.2895 4.61845 13.5757 4.49992 13.8741 4.49992C14.1724 4.49992 14.4586 4.61845 14.6696 4.82942C14.8805 5.0404 14.9991 5.32655 14.9991 5.62492V7.40617L18.7031 3.70117C18.9145 3.48983 19.2011 3.37109 19.5 3.37109C19.7989 3.37109 20.0855 3.48983 20.2969 3.70117C20.5082 3.91251 20.627 4.19916 20.627 4.49804C20.627 4.79693 20.5082 5.08358 20.2969 5.29492H20.295ZM10.1241 12.7499H5.62406C5.32569 12.7499 5.03954 12.8684 4.82857 13.0794C4.61759 13.2904 4.49906 13.5766 4.49906 13.8749C4.49906 14.1733 4.61759 14.4594 4.82857 14.6704C5.03954 14.8814 5.32569 14.9999 5.62406 14.9999H7.40531L3.70312 18.704C3.49178 18.9153 3.37305 19.202 3.37305 19.5009C3.37305 19.7997 3.49178 20.0864 3.70312 20.2977C3.91447 20.5091 4.20111 20.6278 4.5 20.6278C4.79888 20.6278 5.08553 20.5091 5.29687 20.2977L8.99906 16.5937V18.3749C8.99906 18.6733 9.11759 18.9594 9.32857 19.1704C9.53954 19.3814 9.82569 19.4999 10.1241 19.4999C10.4224 19.4999 10.7086 19.3814 10.9196 19.1704C11.1305 18.9594 11.2491 18.6733 11.2491 18.3749V13.8749C11.2491 13.5766 11.1305 13.2904 10.9196 13.0794C10.7086 12.8684 10.4224 12.7499 10.1241 12.7499Z"
                  fill="white"
                />
              </svg>
            )}
            {!open && (
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="block"
              >
                <path
                  d="M28.5 16C28.5 16.3978 28.342 16.7794 28.0607 17.0607C27.7794 17.342 27.3978 17.5 27 17.5H5C4.60218 17.5 4.22064 17.342 3.93934 17.0607C3.65804 16.7794 3.5 16.3978 3.5 16C3.5 15.6022 3.65804 15.2206 3.93934 14.9393C4.22064 14.658 4.60218 14.5 5 14.5H27C27.3978 14.5 27.7794 14.658 28.0607 14.9393C28.342 15.2206 28.5 15.6022 28.5 16ZM5 9.5H27C27.3978 9.5 27.7794 9.34196 28.0607 9.06066C28.342 8.77936 28.5 8.39782 28.5 8C28.5 7.60218 28.342 7.22064 28.0607 6.93934C27.7794 6.65804 27.3978 6.5 27 6.5H5C4.60218 6.5 4.22064 6.65804 3.93934 6.93934C3.65804 7.22064 3.5 7.60218 3.5 8C3.5 8.39782 3.65804 8.77936 3.93934 9.06066C4.22064 9.34196 4.60218 9.5 5 9.5ZM27 22.5H5C4.60218 22.5 4.22064 22.658 3.93934 22.9393C3.65804 23.2206 3.5 23.6022 3.5 24C3.5 24.3978 3.65804 24.7794 3.93934 25.0607C4.22064 25.342 4.60218 25.5 5 25.5H27C27.3978 25.5 27.7794 25.342 28.0607 25.0607C28.342 24.7794 28.5 24.3978 28.5 24C28.5 23.6022 28.342 23.2206 28.0607 22.9393C27.7794 22.658 27.3978 22.5 27 22.5Z"
                  fill="white"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`transition2 relative flex grow flex-col justify-between py-4 xl:py-7 ${open ? "px-3 xl:px-9" : "px-3 xl:px-6"}`}
        >
          <div>
            <h6
              className={`transition2 mb-1.5 text-nowrap text-sm font-bold text-primary xl:mb-2.5 ${open ? "visible w-[100%]" : "invisible w-[0%] overflow-hidden"}`}
            >
              MANAGE
            </h6>
            <div className="relative overflow-hidden">
              <div
                className={`transition3 absolute left-0 right-0 z-10 h-[40px] rounded-md bg-white shadow-lg xl:h-[53px] xl:rounded-[10px] ${path.includes("/settings") ? "hidden" : ""}`}
                style={{
                  transform:
                    width > 1024
                      ? `translateY(${index * (53 + 4)}px)`
                      : `translateY(${index * (40 + 4)}px)`,
                }}
              />
              {menu.map((menuitem, index) => (
                <Link
                  className={`transition3 group relative z-20 mb-1 flex cursor-pointer items-center gap-x-2 rounded-md bg-transparent px-2 py-2 xl:rounded-[10px] xl:px-4 xl:py-3 ${path.includes(menuitem.route.toLowerCase()) ? "" : "hover:bg-primary"}`}
                  key={index}
                  href={`/${menuitem.route.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src={
                      path.includes(menuitem.route.toLowerCase())
                        ? menuitem.active
                        : menuitem.inactive
                    }
                    alt={`${menuitem.route} icon`}
                    className="h-6 w-6 xl:h-auto xl:w-auto"
                  />
                  <span
                    className={`transition2 text-nowrap text-sm xl:text-base ${path.includes(menuitem.route.toLowerCase()) ? "text-primary group-hover:text-white" : "text-white"} ${open ? "visible w-[100%]" : "invisible w-[0%] overflow-hidden"}`}
                  >
                    {menuitem.route}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h6
              className={`transition2 mb-1.5 text-nowrap text-sm font-bold text-primary xl:mb-2.5 ${open ? "visible w-[100%]" : "invisible w-[0%] overflow-hidden"}`}
            >
              PREFERENCE
            </h6>
            <div className="relative">
              <div
                className={`transition3 group relative z-20 mb-1 flex cursor-pointer items-center gap-x-2 rounded-md bg-transparent px-2 py-2 hover:bg-primary xl:rounded-[10px] xl:px-4 xl:py-3 ${path.includes("/settings") ? "bg-white shadow-lg" : "bg-transparent"}`}
                onClick={() => {
                  router.push("/settings");
                  setOpen(false);
                }}
              >
                <Image
                  src={
                    path.includes("/settings")
                      ? settings_active
                      : settings_inactive
                  }
                  alt={`settings icon`}
                  className="h-6 w-6 xl:h-auto xl:w-auto"
                />
                <span
                  className={`transition2 text-nowrap text-sm xl:text-base ${path.includes("/settings") ? "text-primary group-hover:text-white" : "text-white"} ${open ? "visible w-[100%]" : "invisible w-[0%] overflow-hidden"}`}
                >
                  Settings
                </span>
              </div>
              <div
                className="transition3 group relative z-20 mb-1 flex cursor-pointer items-center gap-x-2 rounded-[10px] bg-transparent px-2 py-2 hover:bg-primary xl:px-4 xl:py-3"
                onClick={() => {
                  router.push("/settings");
                }}
              >
                <Image src={logout} alt={`settings icon`} className="" />
                <span
                  className={`transition2 text-nowrap text-sm text-white xl:text-base ${open ? "visible w-[100%]" : "invisible w-[0%] overflow-hidden"}`}
                >
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
