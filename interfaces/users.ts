import { ReactElement } from "react";

export interface Socials {
  name: string;
  url: ReactElement;

}
export interface User {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  subscriptionPlan: string;
  socialBar: string;
  lastSeen: string;
}
export interface ProfileDetail {
  profileUrl: string;
  socialsUrl: Socials[];
  name: string;

  subscriptionPlan: string;
  socialBar: string;
  lastSeen: string;
}
export interface Users {
  id:string;
  name:string;
  createdAt:string;
  email:string;
  role:string
}
