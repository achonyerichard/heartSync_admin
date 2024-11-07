import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";

const Preferences = ({
  interests,
  languages,
}: {
  interests: string[];
  languages: string[];
}) => {
  return (
    <div>
      <Card className="mt-5 flex flex-col space-y-4 rounded-none border-none p-3 shadow-xl">
        <div>
          <h4 className="pb-2 text-base font-bold">Languages</h4>
          {languages?.length > 0 ? (
            languages?.map((item, i) => (
              <Badge
                key={i}
                variant={"outline"}
                className="rounded-[16px] border border-gray shadow-sm"
              >
                {item}
              </Badge>
            ))
          ) : (
            <div className="flex items-center justify-center">N/A</div>
          )}
        </div>
        <div>
          <h4 className="pb-2 text-base font-bold">Interests</h4>
          {interests?.length > 0 ? (
            interests?.map((item, i) => (
              <Badge
                key={i}
                variant={"outline"}
                className="rounded-[16px] border border-gray shadow-sm"
              >
                {item}
              </Badge>
            ))
          ) : (
            <div className="flex items-center justify-center">N/A</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Preferences;
