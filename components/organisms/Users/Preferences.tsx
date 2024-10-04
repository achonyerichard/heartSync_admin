import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";

const Preferences = () => {
  const languages = ["English", "French", "Igbo"];
  const interests = ["Travel", "Movies", "Art", "Tech"];
  return (
    <div>
      <Card className="mt-5 flex flex-col space-y-4 rounded-none border-none p-3 shadow-xl">
        <div>
          <h4 className="pb-2 text-base font-bold">Languages</h4>
          {languages.map((item, i) => (
            <Badge
              key={i}
              variant={"outline"}
              className="border border-gray shadow-sm rounded-[16px]"
            >
              {item}
            </Badge>
          ))}
        </div>
        <div>
          <h4 className="pb-2 text-base font-bold">Interests</h4>
          {interests.map((item, i) => (
            <Badge
              key={i}
              variant={"outline"}
              className="border border-gray shadow-sm rounded-[16px]"
            >
              {item}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Preferences;
