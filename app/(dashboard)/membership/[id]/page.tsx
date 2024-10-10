import EditMembershipForm from "@/components/organisms/Membership/EditMembership";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumbs";

import { HandCoinsIcon } from "lucide-react";

import React from "react";

const Page = () => {
  return (
    <div>
      <div className="mb-4 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex items-center gap-x-2.5">
          <HandCoinsIcon color="red" size={25} />

          <span className="text-[20px] font-bold">Edit Membership</span>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/membership">Membership</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <EditMembershipForm />
    </div>
  );
};

export default Page;
