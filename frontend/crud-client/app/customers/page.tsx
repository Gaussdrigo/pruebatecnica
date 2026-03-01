"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { listCustomers, deleteCustomer } from "../lib/api";
import { CustomerResponse } from "../lib/types";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function load(search?: string) {
    try {
      setLoading(true);
      setError(null);
      const data = await listCustomers(search);
      setCustomers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(c: CustomerResponse) {
    const ok = confirm(`¿Eliminar a "${c.name}"?`);
    if (!ok) return;

    try {
      setError(null);
      setDeletingId(c.id);
      await deleteCustomer(String(c.id));
      await load(q); // refresca manteniendo la búsqueda actual
    } catch (err: any) {
      setError(err?.message ?? "Error eliminando cliente");
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link href="/customers/new" className="underline">
          + Nuevo
        </Link>
      </div>

      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o email"
          className="border p-2 rounded w-full"
        />
        <button onClick={() => load(q)} className="border px-4 rounded">
          Buscar
        </button>
      </div>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Creado</th>
              <th className="p-2 border"></th>
              <th className="p-2 border"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{c.email}</td>
                <td className="p-2 border">{c.status}</td>
                <td className="p-2 border">{new Date(c.createdAt).toLocaleString()}</td>

                <td className="p-2 border text-right">
                  <Link href={`/customers/${c.id}`} className="underline">
                    Editar
                  </Link>
                </td>

                <td className="p-2 border text-right">
                  <button
                    className="text-red-600 underline disabled:opacity-50"
                    disabled={deletingId === c.id}
                    onClick={() => handleDelete(c)}
                  >
                    {deletingId === c.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}