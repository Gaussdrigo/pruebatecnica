"use client";

import { useMemo, useState } from "react";
import { CustomerRequest, CustomerResponse, CustomerStatus } from "../lib/types";

type Props = {
  initial?: CustomerResponse;
  onSubmit: (payload: CustomerRequest) => Promise<void>;
  submitLabel: string;
};

export default function CustomerForm({ initial, onSubmit, submitLabel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [status, setStatus] = useState<CustomerStatus>(initial?.status ?? "ACTIVE");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validation = useMemo(() => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "El nombre es requerido";
    if (!email.trim()) errs.email = "El email es requerido";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Email inválido";
    return errs;
  }, [name, email]);

  const hasErrors = Object.keys(validation).length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (hasErrors) return;

    try {
      setSaving(true);
      await onSubmit({ name: name.trim(), email: email.trim(), status });
    } catch (err: any) {
      setError(err?.message ?? "Error guardando");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg">
      <div className="grid gap-1">
        <label className="font-medium">Nombre</label>
        <input className="border rounded-md p-2" value={name} onChange={(e) => setName(e.target.value)} />
        {validation.name && <p className="text-red-600 text-sm">{validation.name}</p>}
      </div>

      <div className="grid gap-1">
        <label className="font-medium">Email</label>
        <input className="border rounded-md p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        {validation.email && <p className="text-red-600 text-sm">{validation.email}</p>}
      </div>

      <div className="grid gap-1">
        <label className="font-medium">Estado</label>
        <select className="border rounded-md p-2" value={status} onChange={(e) => setStatus(e.target.value as CustomerStatus)}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <button className="bg-black text-white rounded-md p-2 disabled:opacity-50" disabled={saving || hasErrors}>
        {saving ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}