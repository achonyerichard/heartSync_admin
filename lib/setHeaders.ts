import http, { httpForm } from "@/hooks/axios";

export const setHttpHeaders = (prop: string) => {
  http.defaults.headers.common["authorization"] = `Bearer ${prop}`;
  httpForm.defaults.headers.common["authorization"] = `Bearer ${prop}`;
  httpForm.defaults.headers.common["Content-Type"] =
    "application/x-www-form-urlencoded";
};
