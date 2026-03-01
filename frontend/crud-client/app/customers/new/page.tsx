"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomerForm from "../../componets/CustomerForm";
import { createCustomer } from "../../lib/api";

export default function NewCustomerPage() {
  const router = useRouter();

  return (
    <main className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nuevo cliente</h1>
        <Link href="/customers" className="underline">Volver</Link>
      </div>

      <CustomerForm
        submitLabel="Crear"
        onSubmit={async (payload) => {
          await createCustomer(payload);
          router.push("/customers");
        }}
      />
    </main>
  );
}