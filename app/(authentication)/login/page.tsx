"use client";
import Image from "next/image";
import { emailRegex } from "@/lib/regex";
import { Input } from "@/components/ui/input";
import logo from "@/public/images/logo_1.png";
import { useMutate } from "@/hooks/useHttpRequest";
import { toast } from "react-toastify";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { setHttpHeaders } from "@/lib/setHeaders";
import { useAuth } from "@/context/AuthContext";

const Page = () => {
  const router = useRouter();
  const { setUserRole } = useAuth();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [passwordtoggle, setPasswordToggle] = useState(true);
  const [error, setError] = useState({
    email: { error: false, message: "" },
    password: { error: false, message: "" },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleErrorChange = (e: string, error: boolean, message: string) => {
    setError((prev) => ({
      ...prev,
      [e]: { error, message },
    }));
  };

  const { mutate, isLoading } = useMutate(
    "post",
    "auth/adminLogin",
    (data) => {
      toast.success(data?.data.message);
      setCookie("isLoggedIn", true, { maxAge: 31536000 });
      setCookie("heartsyncRole", data?.data?.data?.role, { maxAge: 31536000 });
      setCookie("token", data?.data.data.accessToken, { maxAge: 31536000 });
      localStorage.setItem("heartsync_user", JSON.stringify(data?.data.data));
      setUserRole(data?.data?.data?.role);
      setHttpHeaders(data?.data.data.accessToken);
      router.push("/overview");
    },
    undefined,
    (err: any) => {
      toast.error(err.response.data.message);
    },
  );

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!emailRegex.test(login.email.trim())) {
      handleErrorChange("email", true, "Please enter a valid email");
    } else if (login.password.trim().length < 6) {
      handleErrorChange(
        "password",
        true,
        "Password must be atleast six characters",
      );
    } else {
      mutate(login);
    }
  };

  return (
    <div className="h-fit w-full">
      <header className="mb-7 flex flex-col items-center lg:items-start">
        <Image
          src={logo}
          alt="auth_logo"
          className="mb-10 h-auto w-full rounded-3xl object-cover lg:max-w-[189px]"
        />
        <h3 className="text-center text-3xl font-bold text-primary lg:text-left lg:text-[56px]">
          Welcome Back
        </h3>
      </header>

      <form onSubmit={submitHandler} className="w-full lg:w-10/12">
        <Input
          className={`transition3 mb-7 h-14 border-gray bg-gray ${error.email.error ? "border-primary text-primary" : ""}`}
          placeholder="Email address"
          name="email"
          onChange={handleInputChange}
          onFocus={(e) => handleErrorChange(e.target.name, false, "")}
          message={error.email.message}
        />{" "}
        <div className="relative mb-14 w-full">
          <Input
            className={`transition3 h-14 border-gray bg-gray ${error.password.error ? "border-primary text-primary" : ""}`}
            placeholder="Password"
            name="password"
            type={passwordtoggle ? "password" : "text"}
            onChange={handleInputChange}
            onFocus={(e) => handleErrorChange(e.target.name, false, "")}
            message={error.password.message}
          />
          <div className="absolute inset-y-0 right-0 top-2 flex items-center pr-3 text-sm leading-5">
            <span
              onClick={() => setPasswordToggle(!passwordtoggle)}
              className="cursor-pointer"
            >
              {!passwordtoggle ? (
                <svg
                  className="h-6 fill-black"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="EyeOutlineIcon"
                >
                  <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"></path>
                </svg>
              ) : (
                <svg
                  className="h-6 fill-black"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="EyeOffOutlineIcon"
                >
                  <path d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"></path>
                </svg>
              )}
            </span>
          </div>
        </div>
        <Button
          variant="default"
          className="h-14 w-full active:bg-primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="2" loading={true} /> : <>Log In</>}
        </Button>
      </form>
    </div>
  );
};

export default Page;
