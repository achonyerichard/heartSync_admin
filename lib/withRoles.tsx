"use client"; // Add this for Next.js app directory

import { useRouter } from "next/navigation"; // Correct import for App Router
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MARKETER_ROUTES } from "./Constants";

const withRoleCheck = (WrappedComponent: React.ComponentType) => {
  return function RoleCheckWrapper(props: any) {
    const { userRole } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!userRole) {
        router.push("/login"); // Redirect to login if role is not found
      } else if (userRole === "marketer") {
        const pathname = window.location.pathname.split("/")[1];
        if (MARKETER_ROUTES.includes(pathname)) {
          setIsAuthorized(true);
        } else {
          router.push("/not-authorized"); // Redirect if the route isn't allowed
        }
      } else {
        router.push("/not-authorized"); // Redirect if user role is not marketer
      }
    }, [userRole, router]);

    if (!isAuthorized) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withRoleCheck;
