"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import CustomerForm from "../../componets/CustomerForm";
import { getCustomer, updateCustomer } from "../../lib/api";
import { CustomerResponse } from "../../lib/types";

export default function EditCustomerPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setError(null);
      setLoading(true);
      const data = await getCustomer(id);
      setCustomer(data);
    } catch (err: any) {
      setError(err?.message ?? "Error cargando cliente");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  return (
    <main className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Editar cliente</h1>
        <Link href="/customers" className="underline">Volver</Link>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && customer && (
        <CustomerForm
          initial={customer}
          submitLabel="Guardar"
          onSubmit={async (payload) => {
            await updateCustomer(id, payload);
            router.push("/customers");
          }}
        />
      )}
    </main>
  );
}