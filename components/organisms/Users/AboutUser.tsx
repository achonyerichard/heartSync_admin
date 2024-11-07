import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import React from "react";

const AboutUser = ({ about }: any) => {
  console.log(about);
  return (
    <div>
      <Card className="flex flex-col space-y-2 rounded-none border-none p-3 shadow-xl">
        <div className="flex items-center justify-between text-base [&>*:nth-child(even)]:font-bold">
          {" "}
          <p>Date of Birth</p>
          <p>
            {about?.birthday ? format(about?.birthday, "MMMM dd, yyyy") : "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between text-base [&>*:nth-child(even)]:font-bold">
          {" "}
          <p>Gender</p>
          <p>{about?.gender ?? "N/A"}</p>
        </div>

        <div className="flex items-center justify-between text-base [&>*:nth-child(even)]:font-bold">
          {" "}
          <p>Height</p>
          <p>{about?.height ?? "N/A"}</p>
        </div>
        <div className="flex items-center justify-between text-base [&>*:nth-child(even)]:font-bold">
          {" "}
          <p>Weight</p>
          <p>{about?.weight ?? "N/A"}</p>
        </div>
      </Card>
      <Card className="mt-5 flex flex-col space-y-2 rounded-none border-none p-3 shadow-xl">
        <div className="flex items-center justify-between text-base [&>*:nth-child(even)]:font-bold">
          {" "}
          <p>Education</p>
          <p>{about?.school ?? "N/A"}</p>
        </div>
        <div className="flex items-center justify-between text-base [&>*:nth-child(even)]:font-bold">
          {" "}
          <p>Job Title</p>
          <p>{about?.jobTitle ?? "N/A"}</p>
        </div>
       
      </Card>
    </div>
  );
};

export default AboutUser;
