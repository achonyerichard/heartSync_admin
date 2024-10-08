"use client";
import Image from "next/image";
import { emailRegex } from "@/lib/regex";
import { Input } from "@/components/ui/input";
import logo from "@/public/images/logo_1.png";
import { useMutate } from "@/hooks/useHttpRequest";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@radix-ui/themes";

const Page = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
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
      console.log(data);
    },
    undefined,
    (err) => {},
  );

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!emailRegex.test(login.email.trim())) {
      handleErrorChange("email", true, "Please enter a valid email");
    } else if (login.password.trim().length < 7) {
      handleErrorChange(
        "password",
        true,
        "Password must be atleast seven characters",
      );
    } else {
      mutate(login);
    }
  };

  return (
    <div className="h-fit">
      {" "}
      <Image
        src={logo}
        alt="auth_logo"
        className="mb-10 h-auto max-w-[189px] rounded-3xl object-cover"
      />{" "}
      <h3 className="mb-7 text-[56px] font-bold text-primary">Welcome Back</h3>
      <form onSubmit={submitHandler} className="w-10/12">
        <Input
          className={`transition3 bg-gray-100 focus:border-gray-500 mb-7 h-14 ${error.email.error ? "border-primary text-primary" : ""}`}
          placeholder="Email address"
          name="email"
          onChange={handleInputChange}
          onFocus={(e) => handleErrorChange(e.target.name, false, "")}
          message={error.email.message}
        />{" "}
        <Input
          className={`transition3 bg-gray-100 focus:border-gray-500 mb-14 h-14 ${error.password.error ? "border-primary text-primary" : ""}`}
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleInputChange}
          onFocus={(e) => handleErrorChange(e.target.name, false, "")}
          message={error.password.message}
        />
        <Button
          variant="default"
          className="h-14 w-full active:bg-primary"
          type="submit"
        >
          {isLoading ? <Spinner size="2" loading={true} /> : <>Log In</>}
        </Button>
      </form>
    </div>
  );
};

export default Page;
