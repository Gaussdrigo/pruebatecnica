export type CustomerStatus = "ACTIVE" | "INACTIVE";

export type CustomerResponse = {
  id: number;
  name: string;
  email: string;
  status: CustomerStatus;
  createdAt: string;
};

export type CustomerRequest = {
  name: string;
  email: string;
  status: CustomerStatus;
};