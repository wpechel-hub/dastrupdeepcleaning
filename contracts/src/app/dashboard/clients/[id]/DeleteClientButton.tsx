"use client";

import { useTransition } from "react";

export default function DeleteClientButton({
  clientName,
  onDelete,
}: {
  clientName: string;
  onDelete: () => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          window.confirm(
            `Delete ${clientName || "this client"}? This also permanently deletes all of their contracts. This cannot be undone.`
          )
        ) {
          startTransition(() => onDelete());
        }
      }}
      className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete Client"}
    </button>
  );
}
