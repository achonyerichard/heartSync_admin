import { Card } from "@/components/ui/card";
import React from "react";

const AboutUser = () => {
  return (
    <div>
      <Card className="flex flex-col space-y-2 border-none p-3 rounded-none shadow-xl">
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Date of Birth</p>
          <p>06/09/1901</p>
        </div>
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Gender</p>
          <p>Male</p>
        </div>
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Email</p>
          <p>admin@mail.com</p>
        </div>
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Phone </p>
          <p>+234 8159807048</p>
        </div>
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Height</p>
          <p>180cm</p>
        </div>
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Weight</p>
          <p>70kg</p>
        </div>

      </Card>
      <Card className="flex flex-col space-y-2 border-none p-3 rounded-none shadow-xl mt-5">
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Education</p>
          <p>Univeristy of Nigeria</p>
        </div>
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Job Title</p>
          <p>Developer</p>
        </div>
        <div className="flex items-center justify-between [&>*:nth-child(even)]:font-bold text-base">
          {" "}
          <p>Address</p>
          <p>1 Street</p>
        </div>
       

      </Card>
    </div>
  );
};

export default AboutUser;
