import { CustomerRequest, CustomerResponse } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function listCustomers(q?: string): Promise<CustomerResponse[]> {
  const url = new URL(`${BASE}/api/customers`);
  if (q) url.searchParams.set("q", q);
  const res = await fetch(url.toString(), { cache: "no-store" });
  return handle<CustomerResponse[]>(res);
}

export async function getCustomer(id: string): Promise<CustomerResponse> {
  const res = await fetch(`${BASE}/api/customers/${id}`, { cache: "no-store" });
  return handle<CustomerResponse>(res);
}

export async function createCustomer(payload: CustomerRequest) {
  const res = await fetch(`${BASE}/api/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

export async function updateCustomer(id: string, payload: CustomerRequest) {
  const res = await fetch(`${BASE}/api/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle(res);
}

export async function deleteCustomer(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/customers/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
}